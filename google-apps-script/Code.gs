/**
 * Nuvia Immigration — Contact & Booking Forms → Google Sheets
 *
 * SETUP (one-time) — RECOMMENDED: bind the script to your sheet
 * 1. Sign in to Google as nuvia.immigration@gmail.com
 * 2. Open your form responses Google Sheet in the browser
 * 3. Extensions → Apps Script → paste this file → Save
 * 4. Run verifySpreadsheetAccess() first — must log SUCCESS
 * 5. Run migrateExistingSpreadsheet() once
 * 6. Run installCalendarSyncTriggers() once (authorizes Calendar + Gmail)
 * 7. Run testWrite() once — confirm test rows appear in both tabs
 *
 * STANDALONE SCRIPT (script.google.com): set SPREADSHEET_ID below to the ID
 * from the sheet URL: https://docs.google.com/spreadsheets/d/THIS_PART/edit
 * 7. Deploy → New deployment → Web app
 *    - Execute as: Me (nuvia.immigration@gmail.com)
 *    - Who has access: Anyone
 * 8. Copy the Web app URL → js/config.js as googleScriptUrl
 * 9. After any script change: Deploy → Manage deployments → Edit → New version → Deploy
 *
 * CALENDAR SYNC:
 * - Google Calendar appointment bookings do NOT call doPost.
 * - installCalendarSyncTriggers() watches nuvia.immigration@gmail.com and syncs new
 *   bookings into the "Booking Submissions" tab automatically.
 * - Your booking form's built-in First name / Last name ARE collected by Google, but
 *   Google does NOT copy them into the calendar event description (only custom questions
 *   appear there). The script reads first/last name from the booking confirmation email
 *   in your Gmail inbox — run authorizeAllServices() once to grant Gmail access.
 * - Optional: enable Services → Google Calendar API for richer attendee metadata.
 * - Run syncRecentCalendarBookings() manually to backfill recent appointments.
 *
 * SHEETS:
 * - "Contact Submissions" — website contact form (doPost)
 * - "Booking Submissions" — Google Calendar appointment schedule bookings
 */

// Standalone script only — use the ID from your sheet URL between /d/ and /edit.
// Example: 171NCEqpwPd_uMMwq43hcaaGePkMY_KdH9q1Du_N-y4E
// If the script is opened via Extensions → Apps Script inside the sheet, leave this as-is.
var SPREADSHEET_ID = "PASTE_YOUR_SPREADSHEET_ID_HERE";
var ENABLE_GMAIL_NAME_LOOKUP = true;
var CALENDAR_EMAIL = "nuvia.immigration@gmail.com";
var SCRIPT_VERSION = "2026-09-23-contact-routing-v3";
var DRIVE_FOLDER_NAME = "Nuvia Immigration";

var SHEET_CONTACT = "Contact Submissions";
var SHEET_BOOKING = "Booking Submissions";

var PROCESSED_EVENTS_PROP = "processedCalendarEventIds";
var SYNC_HANDLER = "syncRecentCalendarBookings";
var CALENDAR_HANDLER = "onCalendarEventUpdated";

var CONTACT_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Service",
  "Message",
  "Language",
];

var BOOKING_HEADERS = [
  "Timestamp",
  "First Name",
  "Last Name",
  "Email",
  "Consultation Topic",
  "Purpose Detail",
  "In Canada",
  "Current Status & Expiry",
  "Who Is Applying",
  "Appointment Date/Time",
  "Site Language",
];

// Google Calendar appointment schedules store answers as HTML in the event description.
// Each question label must match the start of your booking form field text.
var BOOKING_QUESTION_FIELDS = [
  { key: "firstName", prefix: "first name" },
  { key: "lastName", prefix: "last name" },
  { key: "email", prefix: "email address" },
  {
    key: "consultationAbout",
    prefix: "what is your consultation about",
  },
  {
    key: "purposeDetail",
    prefix: "please explain the purpose of the consultation",
  },
  { key: "inCanada", prefix: "are you currently in canada" },
  { key: "statusExpiry", prefix: "current status and expiry" },
  { key: "whoApplying", prefix: "who is applying" },
];

function getOrCreateFolder() {
  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function getSpreadsheet() {
  var activeSpreadsheet = getActiveSpreadsheetSafe();
  if (activeSpreadsheet) {
    return activeSpreadsheet;
  }

  if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_SPREADSHEET_ID_HERE") {
    throw new Error(
      "No spreadsheet connected. Either open this script from your Google Sheet " +
      "(Extensions → Apps Script) or set SPREADSHEET_ID in Code.gs."
    );
  }

  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (err) {
    throw new Error(
      "Cannot open spreadsheet " + SPREADSHEET_ID + ". " +
      "Sign in to Apps Script as nuvia.immigration@gmail.com, confirm that account " +
      "owns or can edit the sheet, and run verifySpreadsheetAccess(). " +
      "Original error: " + err
    );
  }
}

function getActiveSpreadsheetSafe() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    return null;
  }
}

/**
 * Run this first. Check Executions → Logs for SUCCESS or FAILED.
 */
/**
 * Run once to grant Sheets + Calendar + Gmail in a single authorization step.
 */
function authorizeAllServices() {
  verifySpreadsheetAccess();
  getBookingCalendar().getName();
  GmailApp.getInboxUnreadCount();
  Logger.log("All services authorized. Built-in first/last names are read from Gmail booking emails.");
}

function verifySpreadsheetAccess() {
  Logger.log("Active user: " + Session.getActiveUser().getEmail());
  Logger.log("Effective user: " + Session.getEffectiveUser().getEmail());
  Logger.log("Configured SPREADSHEET_ID: " + SPREADSHEET_ID);

  var activeSpreadsheet = getActiveSpreadsheetSafe();
  if (activeSpreadsheet) {
    Logger.log("Bound mode: script is attached to a spreadsheet.");
    Logger.log("SUCCESS - Spreadsheet: " + activeSpreadsheet.getName());
    Logger.log("URL: " + activeSpreadsheet.getUrl());
    Logger.log("ID: " + activeSpreadsheet.getId());
    return activeSpreadsheet.getUrl();
  }

  Logger.log("Standalone mode: opening spreadsheet by SPREADSHEET_ID.");
  var ss = getSpreadsheet();
  Logger.log("SUCCESS - Spreadsheet: " + ss.getName());
  Logger.log("URL: " + ss.getUrl());
  Logger.log("ID: " + ss.getId());
  return ss.getUrl();
}

function ensureSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function createSheet() {
  var folder = getOrCreateFolder();
  var ss = SpreadsheetApp.create("Nuvia Immigration — Form Submissions");
  var file = DriveApp.getFileById(ss.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  var contactSheet = ss.getActiveSheet();
  contactSheet.setName(SHEET_CONTACT);
  contactSheet.appendRow(CONTACT_HEADERS);
  contactSheet.getRange(1, 1, 1, CONTACT_HEADERS.length).setFontWeight("bold");
  contactSheet.setFrozenRows(1);

  var bookingSheet = ss.insertSheet(SHEET_BOOKING);
  bookingSheet.appendRow(BOOKING_HEADERS);
  bookingSheet.getRange(1, 1, 1, BOOKING_HEADERS.length).setFontWeight("bold");
  bookingSheet.setFrozenRows(1);

  Logger.log("Spreadsheet created in Google Drive folder: " + DRIVE_FOLDER_NAME);
  Logger.log("SPREADSHEET_ID: " + ss.getId());
  Logger.log("URL: " + ss.getUrl());
}

function migrateExistingSpreadsheet() {
  var ss = getSpreadsheet();
  ensureSheet(ss, SHEET_CONTACT, CONTACT_HEADERS);
  ensureSheet(ss, SHEET_BOOKING, BOOKING_HEADERS);
  Logger.log("Sheets verified. URL: " + ss.getUrl());
}

function testWrite() {
  var ss = getSpreadsheet();
  var contact = ensureSheet(ss, SHEET_CONTACT, CONTACT_HEADERS);
  var booking = ensureSheet(ss, SHEET_BOOKING, BOOKING_HEADERS);

  contact.appendRow([
    new Date(),
    "Contact Test",
    "test@example.com",
    "514-000-0000",
    "other",
    "Apps Script contact test row — safe to delete",
    "en",
  ]);

  booking.appendRow([
    new Date(),
    "Jane",
    "Doe",
    "booking@example.com",
    "PR",
    "Interested in Express Entry — currently on work permit",
    "Yes",
    "Work permit, expires 2026-06-01",
    "With spouse",
    "March 15, 2026 at 2:00 PM EST",
    "calendar",
  ]);

  Logger.log("Test rows added to Contact and Booking sheets.");
}

function parseRequestData(e) {
  if (!e) {
    return {};
  }

  if (e.postData && e.postData.type === "application/json") {
    return JSON.parse(e.postData.contents);
  }

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return normalizeParameterObject(e.parameter);
  }

  if (e.postData && e.postData.contents) {
    return parseUrlEncodedBody(e.postData.contents);
  }

  return {};
}

function normalizeParameterObject(params) {
  var data = {};
  Object.keys(params).forEach(function(key) {
    var value = params[key];
    if (Array.isArray(value)) {
      data[key] = value.length ? String(value[0]) : "";
    } else {
      data[key] = value == null ? "" : String(value);
    }
  });
  return data;
}

function parseUrlEncodedBody(body) {
  var data = {};
  String(body || "")
    .split("&")
    .forEach(function(pair) {
      if (!pair) {
        return;
      }
      var index = pair.indexOf("=");
      if (index === -1) {
        return;
      }
      var key = decodeURIComponent(pair.slice(0, index).replace(/\+/g, " "));
      var value = decodeURIComponent(pair.slice(index + 1).replace(/\+/g, " "));
      data[key] = value;
    });
  return data;
}

function detectFormType(data) {
  if (String(data.source || "") === "website-contact-form") {
    return "contact";
  }

  var explicit = String(data.formType || "").toLowerCase().trim();
  if (explicit === "booking" || explicit === "contact") {
    return explicit;
  }

  var hasContactShape = !!(data.name && data.message && data.phone !== undefined);
  var hasBookingShape = !!(
    data.firstName ||
    data.lastName ||
    data.consultationAbout ||
    data.purposeDetail ||
    data.appointmentDatetime ||
    data.inCanada ||
    data.whoApplying
  );

  if (hasContactShape && !hasBookingShape) {
    return "contact";
  }
  if (hasBookingShape && !hasContactShape) {
    return "booking";
  }

  return "contact";
}

function pick(data, keys) {
  for (var i = 0; i < keys.length; i++) {
    var value = data[keys[i]];
    if (value != null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }
  return "";
}

function appendContactRow(data) {
  var ss = getSpreadsheet();
  var sheet = ensureSheet(ss, SHEET_CONTACT, CONTACT_HEADERS);
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.service || "",
    data.message || "",
    data.language || "en",
  ]);
}

function appendBookingRow(data) {
  var ss = getSpreadsheet();
  var sheet = ensureSheet(ss, SHEET_BOOKING, BOOKING_HEADERS);
  sheet.appendRow([
    new Date(),
    pick(data, ["firstName", "first_name", "First name"]),
    pick(data, ["lastName", "last_name", "Last name"]),
    pick(data, ["email", "emailAddress", "Email address"]),
    pick(data, [
      "consultationAbout",
      "consultation_topic",
      "consultationTopic",
      "topic",
    ]),
    pick(data, [
      "purposeDetail",
      "purpose",
      "purpose_detail",
      "summary",
      "detail",
    ]),
    pick(data, ["inCanada", "in_canada", "inCanadaYesNo"]),
    pick(data, [
      "statusExpiry",
      "currentStatus",
      "status",
      "current_status",
      "statusAndExpiry",
    ]),
    pick(data, [
      "whoApplying",
      "who_applying",
      "applicants",
      "applying",
      "whoIsApplying",
    ]),
    pick(data, [
      "appointmentDatetime",
      "appointmentDateTime",
      "appointment",
      "dateTime",
    ]),
    pick(data, ["language", "siteLanguage"]) || "calendar",
  ]);
}

function isWebsiteContactSubmission(data) {
  return (
    String(data.source || "") === "website-contact-form" ||
    (
      String(data.formType || "").toLowerCase() === "contact" &&
      data.name &&
      data.email &&
      data.message !== undefined
    )
  );
}

function processFormSubmission(data, method) {
  var formType = detectFormType(data);
  var targetSheet = formType === "booking" ? SHEET_BOOKING : SHEET_CONTACT;

  Logger.log(
    method + " version=" + SCRIPT_VERSION +
    " formType=" + formType +
    " targetSheet=" + targetSheet +
    " source=" + (data.source || "") +
    " keys=" + Object.keys(data).join(",")
  );

  if (formType === "booking") {
    appendBookingRow(data);
  } else {
    appendContactRow(data);
  }

  return jsonResponse({
    success: true,
    formType: formType,
    targetSheet: targetSheet,
    version: SCRIPT_VERSION,
    method: method,
  });
}

function doPost(e) {
  try {
    return processFormSubmission(parseRequestData(e), "POST");
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString(), version: SCRIPT_VERSION });
  }
}

function doGet(e) {
  var data = normalizeParameterObject(e.parameter || {});
  if (isWebsiteContactSubmission(data)) {
    try {
      return processFormSubmission(data, "GET");
    } catch (err) {
      return jsonResponse({ success: false, error: err.toString(), version: SCRIPT_VERSION });
    }
  }

  return jsonResponse({
    status: "ok",
    service: "Nuvia Immigration Contact & Booking Forms",
    version: SCRIPT_VERSION,
    routing: {
      contact: SHEET_CONTACT,
      booking: SHEET_BOOKING,
    },
    sheets: [SHEET_CONTACT, SHEET_BOOKING],
    calendarSync: CALENDAR_EMAIL,
  });
}

/**
 * Run in Apps Script to confirm contact rows go to the Contact Submissions tab.
 */
function testContactFormRouting() {
  appendContactRow({
    name: "Routing Test",
    email: "routing-test@example.com",
    phone: "514-000-0000",
    service: "other",
    message: "Safe to delete — confirms Contact Submissions tab routing.",
    language: "en",
  });
  Logger.log("Added test row to tab: " + SHEET_CONTACT);
}

/**
 * Simulates the exact website POST. Run this, then redeploy and compare with a live form submit.
 */
function testWebAppContactPost() {
  var response = doPost({
    postData: {
      type: "application/x-www-form-urlencoded",
      contents:
        "source=website-contact-form" +
        "&formType=contact" +
        "&name=Web+POST+Test" +
        "&email=web-post-test@example.com" +
        "&phone=514-000-0000" +
        "&service=other" +
        "&message=Should+land+in+Contact+Submissions" +
        "&language=en",
    },
  });
  Logger.log(response.getContent());
}

function testWebAppContactGet() {
  var response = doGet({
    parameter: {
      source: "website-contact-form",
      formType: "contact",
      name: "Web GET Test",
      email: "web-get-test@example.com",
      phone: "514-000-0000",
      service: "other",
      message: "Should land in Contact Submissions",
      language: "en",
    },
  });
  Logger.log(response.getContent());
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------------------
// Google Calendar appointment schedule → Booking Submissions
// ---------------------------------------------------------------------------

function getBookingCalendar() {
  var calendar = CalendarApp.getCalendarById(CALENDAR_EMAIL);
  if (!calendar) {
    calendar = CalendarApp.getDefaultCalendar();
  }
  if (!calendar) {
    throw new Error("Could not open calendar for " + CALENDAR_EMAIL);
  }
  return calendar;
}

function installCalendarSyncTriggers() {
  removeCalendarSyncTriggers();

  ScriptApp.newTrigger(CALENDAR_HANDLER)
    .forUserCalendar(CALENDAR_EMAIL)
    .onEventUpdated()
    .create();

  ScriptApp.newTrigger(SYNC_HANDLER)
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log("Calendar sync triggers installed for " + CALENDAR_EMAIL);
  Logger.log("Run syncRecentCalendarBookings() once to backfill recent bookings.");
}

function removeCalendarSyncTriggers() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    var handler = trigger.getHandlerFunction();
    if (handler === CALENDAR_HANDLER || handler === SYNC_HANDLER) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

function onCalendarEventUpdated(e) {
  syncRecentCalendarBookings();
}

function syncRecentCalendarBookings() {
  var calendar = getBookingCalendar();
  var now = new Date();
  var start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var end = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
  var events = calendar.getEvents(start, end);
  var synced = 0;

  events.forEach(function(event) {
    if (syncCalendarEventIfNeeded(event)) {
      synced++;
    }
  });

  var gmailUpdated = syncGmailBookingNames();
  Logger.log("Calendar sync complete. New bookings synced: " + synced + ", Gmail name updates: " + gmailUpdated);
  return synced + gmailUpdated;
}

function syncCalendarEventIfNeeded(event) {
  var eventId = event.getId();
  if (!isBookableAppointmentEvent(event)) {
    return false;
  }

  var booking = parseBookingFromCalendarEvent(event);
  var existingRow = findBookingRow(booking.email, booking.appointmentDatetime);
  var hasNames = !!(booking.firstName && booking.lastName);
  var synced = false;

  if (existingRow > 0) {
    updateBookingRowIfNeeded(existingRow, booking);
    synced = hasNames;
  } else if (!isEventProcessed(eventId)) {
    appendBookingRow(booking);
    synced = true;
    Logger.log("Synced booking: " + booking.email + " @ " + booking.appointmentDatetime);
  }

  if (hasNames || shouldGiveUpNameLookup(eventId)) {
    markEventProcessed(eventId);
  } else {
    touchEventFirstSeen(eventId);
  }

  return synced;
}

function findBookingRow(email, appointmentDatetime) {
  if (!email || !appointmentDatetime) {
    return 0;
  }

  var sheet = ensureSheet(getSpreadsheet(), SHEET_BOOKING, BOOKING_HEADERS);
  var values = sheet.getDataRange().getValues();
  for (var row = 1; row < values.length; row++) {
    if (values[row][3] === email && values[row][9] === appointmentDatetime) {
      return row + 1;
    }
  }
  return 0;
}

function updateBookingRowIfNeeded(rowNumber, booking) {
  var sheet = getSpreadsheet().getSheetByName(SHEET_BOOKING);
  if (!sheet) {
    return;
  }

  var currentNames = sheet.getRange(rowNumber, 2, 1, 2).getValues()[0];
  if (currentNames[0] && currentNames[1]) {
    return;
  }

  if (booking.firstName || booking.lastName) {
    sheet.getRange(rowNumber, 2, 1, 2).setValues([[booking.firstName, booking.lastName]]);
    Logger.log("Updated names for row " + rowNumber + ": " + booking.firstName + " " + booking.lastName);
  }
}

function touchEventFirstSeen(eventId) {
  var key = "seen_" + eventId;
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty(key)) {
    props.setProperty(key, new Date().toISOString());
  }
}

function shouldGiveUpNameLookup(eventId) {
  var key = "seen_" + eventId;
  var props = PropertiesService.getScriptProperties();
  var firstSeen = props.getProperty(key);
  if (!firstSeen) {
    return false;
  }
  var ageMs = Date.now() - new Date(firstSeen).getTime();
  return ageMs > 2 * 60 * 60 * 1000;
}

function isBookableAppointmentEvent(event) {
  if (event.isAllDayEvent()) {
    return false;
  }

  var guests = event.getGuestList(true);
  var ownerEmail = CALENDAR_EMAIL.toLowerCase();
  var hasExternalGuest = false;

  guests.forEach(function(guest) {
    var email = (guest.getEmail() || "").toLowerCase();
    if (
      email &&
      email !== ownerEmail &&
      email.indexOf("@group.calendar.google.com") === -1 &&
      email.indexOf("resource.calendar.google.com") === -1
    ) {
      hasExternalGuest = true;
    }
  });

  if (!hasExternalGuest) {
    return false;
  }

  var title = (event.getTitle() || "").toLowerCase();
  var description = (event.getDescription() || "").toLowerCase();
  var combined = title + "\n" + description;

  var hasFormHints = /consultation about|purpose of the consultation|currently in canada|who is applying|first name|last name/i.test(combined);
  var looksLikeConsultation = /consultation|appointment|nuvia|booked/i.test(combined);

  return hasFormHints || looksLikeConsultation;
}

function parseBookingFromCalendarEvent(event) {
  var description = event.getDescription() || "";
  var parsed = parseBookingFieldsFromHtml(description);
  var guest = getPrimaryGuest(event);
  var apiGuest = getGuestDetailsFromApi(event);
  var email = parsed.email || (apiGuest && apiGuest.email) || guest.email || "";
  var gmailDetails = lookupBookingDetailsFromGmail(email, event.getStartTime());
  var names = resolveBookingNames({
    parsed: parsed,
    rawNames: { firstName: parsed.firstName || "", lastName: parsed.lastName || "" },
    gmailDetails: gmailDetails,
    guest: guest,
    apiGuest: apiGuest,
    email: email,
    event: event,
  });

  return {
    firstName: names.firstName,
    lastName: names.lastName,
    email: cleanAnswer(email),
    consultationAbout: cleanAnswer(parsed.consultationAbout || ""),
    purposeDetail: cleanAnswer(parsed.purposeDetail || ""),
    inCanada: cleanAnswer(parsed.inCanada || ""),
    statusExpiry: cleanAnswer(parsed.statusExpiry || ""),
    whoApplying: cleanAnswer(parsed.whoApplying || ""),
    appointmentDatetime: formatAppointmentTime(event.getStartTime(), event.getEndTime()),
    language: "calendar",
  };
}

function resolveBookingNames(context) {
  var gmail = context.gmailDetails || {};
  var firstName = cleanAnswer(
    gmail.firstName || context.parsed.firstName || context.rawNames.firstName || ""
  );
  var lastName = cleanAnswer(
    gmail.lastName || context.parsed.lastName || context.rawNames.lastName || ""
  );

  if (!firstName && !lastName && context.apiGuest && context.apiGuest.name) {
    var apiParts = splitFullName(sanitizeGuestName(context.apiGuest.name, context.email));
    firstName = apiParts.firstName;
    lastName = apiParts.lastName;
  }

  if (!firstName && !lastName && context.guest && context.guest.name) {
    var guestParts = splitFullName(sanitizeGuestName(context.guest.name, context.email));
    firstName = guestParts.firstName;
    lastName = guestParts.lastName;
  }

  if (!firstName && !lastName) {
    var titleParts = parseNamesFromTitle(context.event.getTitle() || "");
    firstName = titleParts.firstName;
    lastName = titleParts.lastName;
  }

  return {
    firstName: cleanAnswer(firstName),
    lastName: cleanAnswer(lastName),
  };
}

function sanitizeGuestName(name, email) {
  var value = String(name || "").trim();
  if (!value) {
    return "";
  }
  if (value.indexOf("@") !== -1) {
    return "";
  }
  if (email && value.toLowerCase() === String(email).toLowerCase()) {
    return "";
  }
  return value;
}

function parseNamesFromRawHtml(html) {
  var result = { firstName: "", lastName: "" };
  if (!html) {
    return result;
  }

  var patterns = [
    { key: "firstName", regex: /First name[\s\S]{0,240}?>([^<]+)</i },
    { key: "lastName", regex: /Last name[\s\S]{0,240}?>([^<]+)</i },
    { key: "firstName", regex: /First name[^:\n]*:\s*([^<\n]+)/i },
    { key: "lastName", regex: /Last name[^:\n]*:\s*([^<\n]+)/i },
  ];

  patterns.forEach(function(entry) {
    if (result[entry.key]) {
      return;
    }
    var match = html.match(entry.regex);
    if (match && match[1]) {
      var value = cleanAnswer(match[1]);
      if (value) {
        result[entry.key] = value;
      }
    }
  });

  return result;
}

function parseNamesFromNotificationText(text, guestEmail) {
  var result = { firstName: "", lastName: "" };
  if (!text) {
    return result;
  }

  var plain = htmlToPlainText(text);
  var raw = String(text);

  var firstMatch = plain.match(/First name\s*\n+\s*([^\n]+)/i);
  var lastMatch = plain.match(/Last name\s*\n+\s*([^\n]+)/i);
  if (firstMatch) {
    result.firstName = cleanAnswer(firstMatch[1]);
  }
  if (lastMatch) {
    result.lastName = cleanAnswer(lastMatch[1]);
  }

  if (!result.firstName) {
    firstMatch = plain.match(/First name[^:\n]*:\s*([^\n]+)/i);
    if (firstMatch) {
      result.firstName = cleanAnswer(firstMatch[1]);
    }
  }
  if (!result.lastName) {
    lastMatch = plain.match(/Last name[^:\n]*:\s*([^\n]+)/i);
    if (lastMatch) {
      result.lastName = cleanAnswer(lastMatch[1]);
    }
  }

  if (!result.firstName && !result.lastName && guestEmail) {
    result = parseNameBeforeEmail(plain, guestEmail);
  }

  if (guestEmail && (result.firstName || result.lastName)) {
    if (!messageMatchesGuest(plain, guestEmail) && !messageMatchesGuest(raw, guestEmail)) {
      return { firstName: "", lastName: "" };
    }
  }

  return result;
}

function messageMatchesGuest(text, guestEmail) {
  if (!guestEmail) {
    return true;
  }
  return String(text).toLowerCase().indexOf(String(guestEmail).toLowerCase()) !== -1;
}

function lookupBookingDetailsFromGmail(guestEmail, eventStart) {
  if (!guestEmail || !ENABLE_GMAIL_NAME_LOOKUP) {
    return {};
  }

  try {
    var message = findGmailBookingMessage(guestEmail, eventStart);
    if (!message) {
      return {};
    }

    var plain = message.getPlainBody() || "";
    var html = message.getBody() || "";
    var names = parseNamesFromNotificationText(plain, guestEmail);
    if (!names.firstName && !names.lastName) {
      names = parseNamesFromNotificationText(html, guestEmail);
    }

    return {
      firstName: names.firstName || "",
      lastName: names.lastName || "",
    };
  } catch (err) {
    Logger.log("Gmail booking lookup skipped: " + err);
    return {};
  }
}

function findGmailBookingMessage(guestEmail, eventStart) {
  var safeEmail = String(guestEmail).replace(/"/g, "");
  var dateHint = "";
  if (eventStart) {
    dateHint = Utilities.formatDate(eventStart, Session.getScriptTimeZone(), "MMM d, yyyy");
  }

  var queries = [
    '"' + safeEmail + '" ("First name" OR "Last name") newer_than:30d',
    'from:google.com "' + safeEmail + '" newer_than:30d',
    'from:(calendar-notification@google.com OR noreply@google.com) "' + safeEmail + '" newer_than:30d',
    '"Booked by" "' + safeEmail + '" newer_than:30d',
  ];

  if (dateHint) {
    queries.unshift('"' + safeEmail + '" "' + dateHint + '" newer_than:30d');
  }

  for (var q = 0; q < queries.length; q++) {
    var threads = GmailApp.search(queries[q], 0, 8);
    for (var t = 0; t < threads.length; t++) {
      var messages = threads[t].getMessages();
      for (var m = messages.length - 1; m >= 0; m--) {
        var message = messages[m];
        var body = (message.getPlainBody() || "") + "\n" + htmlToPlainText(message.getBody() || "");
        if (!messageMatchesGuest(body, guestEmail)) {
          continue;
        }
        if (/first name|last name|booked|appointment|consultation/i.test(body)) {
          return message;
        }
      }
    }
  }

  return null;
}

function syncGmailBookingNames() {
  if (!ENABLE_GMAIL_NAME_LOOKUP) {
    return 0;
  }

  try {
    var sheet = ensureSheet(getSpreadsheet(), SHEET_BOOKING, BOOKING_HEADERS);
    var values = sheet.getDataRange().getValues();
    var updated = 0;

    for (var row = 1; row < values.length; row++) {
      if (values[row][1] && values[row][2]) {
        continue;
      }
      if (!values[row][3]) {
        continue;
      }

      var email = values[row][3];
      var appointmentDatetime = values[row][9] || "";
      var eventStart = parseAppointmentStart(appointmentDatetime);
      var gmailDetails = lookupBookingDetailsFromGmail(email, eventStart);

      if (gmailDetails.firstName || gmailDetails.lastName) {
        sheet.getRange(row + 1, 2, 1, 2).setValues([[
          gmailDetails.firstName || values[row][1] || "",
          gmailDetails.lastName || values[row][2] || "",
        ]]);
        updated++;
      }
    }

    return updated;
  } catch (err) {
    Logger.log("Gmail name backfill skipped: " + err);
    return 0;
  }
}

function parseAppointmentStart(text) {
  if (!text) {
    return null;
  }
  var match = String(text).match(/^([A-Za-z]+ \d{1,2}, \d{4}) at (\d{1,2}:\d{2} [AP]M)/);
  if (!match) {
    return null;
  }
  try {
    return new Date(match[1] + " " + match[2]);
  } catch (err) {
    return null;
  }
}

function parseNamesFromTitle(title) {
  var match = String(title || "").match(/(?:consultation|appointment|booking)\s*[-–—:]\s*(.+)$/i);
  if (!match) {
    return { firstName: "", lastName: "" };
  }
  return splitFullName(match[1]);
}

function parseNameBeforeEmail(text, guestEmail) {
  var lines = htmlToPlainText(text)
    .split("\n")
    .map(function(line) {
      return line.trim();
    })
    .filter(Boolean);

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase() !== String(guestEmail).toLowerCase() || i === 0) {
      continue;
    }

    var candidate = lines[i - 1];
    if (
      candidate &&
      candidate.indexOf("@") === -1 &&
      !matchQuestionField(candidate) &&
      !/^https?:\/\//i.test(candidate)
    ) {
      return splitFullName(candidate);
    }
  }

  return { firstName: "", lastName: "" };
}

function getPrimaryGuest(event) {
  var ownerEmail = CALENDAR_EMAIL.toLowerCase();
  var guests = event.getGuestList(true);
  var fallback = { name: "", email: "" };

  for (var i = 0; i < guests.length; i++) {
    var guest = guests[i];
    var email = (guest.getEmail() || "").toLowerCase();
    if (
      !email ||
      email === ownerEmail ||
      email.indexOf("@group.calendar.google.com") !== -1
    ) {
      continue;
    }

    var guestName = "";
    try {
      var guestByEmail = event.getGuestByEmail(guest.getEmail());
      if (guestByEmail) {
        guestName = (guestByEmail.getName() || "").trim();
      }
    } catch (err) {
      guestName = (guest.getName() || "").trim();
    }

    return {
      name: guestName || (guest.getName() || "").trim(),
      email: guest.getEmail() || "",
    };
  }

  return fallback;
}

function htmlToPlainText(html) {
  var text = String(html || "");
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/p>/gi, "\n");
  text = text.replace(/<\/div>/gi, "\n");
  text = text.replace(/<\/li>/gi, "\n");
  text = text.replace(/<\/tr>/gi, "\n");
  text = text.replace(/<\/h[1-6]>/gi, "\n");
  text = text.replace(/<[^>]+>/g, "");
  text = text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
  text = text.replace(/\r/g, "");
  text = text.replace(/[ \t]+\n/g, "\n");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

function normalizeQuestionLine(line) {
  return String(line || "")
    .replace(/\*+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function matchQuestionField(line) {
  var normalized = normalizeQuestionLine(line);
  if (!normalized) {
    return null;
  }

  for (var i = 0; i < BOOKING_QUESTION_FIELDS.length; i++) {
    var field = BOOKING_QUESTION_FIELDS[i];
    if (normalized.indexOf(field.prefix) === 0) {
      return field.key;
    }
  }

  return null;
}

function cleanAnswer(value) {
  var answer = htmlToPlainText(value).replace(/\*+$/g, "").trim();
  if (!answer || isGarbageAnswer(answer)) {
    return "";
  }
  return answer;
}

function isGarbageAnswer(value) {
  return (
    /<[^>]+>/.test(value) ||
    /\*\/|<\/b>|^\*+$|^[\*\/\?<>:]+$/.test(value) ||
    /^\)? \*$/.test(value)
  );
}

function parseBookingFieldsFromHtml(description) {
  var result = parseLabelValuePairsFromHtml(description);
  var fromLines = parseDescriptionFields(description);

  Object.keys(fromLines).forEach(function(key) {
    if (!result[key]) {
      result[key] = fromLines[key];
    }
  });

  return result;
}

function parseLabelValuePairsFromHtml(html) {
  var result = {};
  if (!html) {
    return result;
  }

  var tdPairRegex = /<td[^>]*>\s*([^<]+?)\s*<\/td>\s*<td[^>]*>\s*([^<]+?)\s*<\/td>/gi;
  var match;
  while ((match = tdPairRegex.exec(html)) !== null) {
    var fieldKey = matchQuestionField(match[1]);
    var value = cleanAnswer(match[2]);
    if (fieldKey && value && !result[fieldKey]) {
      result[fieldKey] = value;
    }
  }

  return result;
}

function parseDescriptionFields(description) {
  var result = {};
  if (!description) {
    return result;
  }

  var lines = htmlToPlainText(description)
    .split("\n")
    .map(function(line) {
      return line.trim();
    })
    .filter(Boolean);

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var fieldKey = matchQuestionField(line);

    if (!fieldKey || result[fieldKey]) {
      continue;
    }

    var colonMatch = line.match(/^(.+?):\s*(.+)$/);
    if (colonMatch && matchQuestionField(colonMatch[1])) {
      var inlineAnswer = cleanAnswer(colonMatch[2]);
      if (inlineAnswer) {
        result[fieldKey] = inlineAnswer;
        continue;
      }
    }

    if (i + 1 < lines.length) {
      var nextLine = lines[i + 1];
      if (!matchQuestionField(nextLine)) {
        var answer = cleanAnswer(nextLine);
        if (answer) {
          result[fieldKey] = answer;
          i++;
        }
      }
    }
  }

  return result;
}

function getApiEvent(event) {
  try {
    if (typeof Calendar === "undefined" || !Calendar.Events) {
      return null;
    }
    return Calendar.Events.get(CALENDAR_EMAIL, event.getId());
  } catch (err) {
    Logger.log("Calendar API event lookup skipped: " + err);
    return null;
  }
}

function getGuestDetailsFromApi(event) {
  var apiEvent = getApiEvent(event);
  if (!apiEvent || !apiEvent.attendees) {
    return null;
  }

  var ownerEmail = CALENDAR_EMAIL.toLowerCase();
  for (var i = 0; i < apiEvent.attendees.length; i++) {
    var attendee = apiEvent.attendees[i];
    var email = (attendee.email || "").toLowerCase();
    if (
      email &&
      email !== ownerEmail &&
      email.indexOf("@group.calendar.google.com") === -1 &&
      !attendee.resource
    ) {
      return {
        email: attendee.email || "",
        name: attendee.displayName || attendee.comment || "",
      };
    }
  }

  return null;
}

function splitFullName(fullName) {
  var parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function formatAppointmentTime(start, end) {
  var tz = Session.getScriptTimeZone();
  var startText = Utilities.formatDate(start, tz, "MMMM d, yyyy 'at' h:mm a");
  var endText = Utilities.formatDate(end, tz, "h:mm a z");
  return startText + " – " + endText;
}

function isEventProcessed(eventId) {
  var ids = getProcessedEventIds();
  return ids.indexOf(eventId) !== -1;
}

function markEventProcessed(eventId) {
  var ids = getProcessedEventIds();
  if (ids.indexOf(eventId) !== -1) {
    return;
  }
  ids.push(eventId);
  if (ids.length > 2000) {
    ids = ids.slice(ids.length - 2000);
  }
  PropertiesService.getScriptProperties().setProperty(
    PROCESSED_EVENTS_PROP,
    JSON.stringify(ids)
  );
}

function getProcessedEventIds() {
  var raw = PropertiesService.getScriptProperties().getProperty(PROCESSED_EVENTS_PROP);
  if (!raw) {
    return [];
  }
  try {
    var ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch (err) {
    return [];
  }
}

function resetCalendarSyncState() {
  var props = PropertiesService.getScriptProperties().getProperties();
  Object.keys(props).forEach(function(key) {
    if (key === PROCESSED_EVENTS_PROP || key.indexOf("seen_") === 0) {
      PropertiesService.getScriptProperties().deleteProperty(key);
    }
  });
  Logger.log("Cleared processed calendar event IDs and retry markers.");
}

/**
 * Re-sync recent bookings after parser fixes.
 * Delete bad rows from the sheet first, then run this.
 */
function resyncRecentCalendarBookings() {
  resetCalendarSyncState();
  return syncRecentCalendarBookings();
}

/**
 * Fill in missing first/last names on rows already in the sheet.
 * Does not create duplicate rows.
 */
function backfillMissingBookingNames() {
  var updated = syncGmailBookingNames();
  Logger.log("Backfill complete. Rows updated from Gmail: " + updated);
  return updated;
}

/**
 * Debug helper: logs how the next upcoming guest event would be parsed.
 * Open a real booked appointment in Google Calendar first, then run this.
 */
function debugNextBookingEvent() {
  var calendar = getBookingCalendar();
  var now = new Date();
  var events = calendar.getEvents(now, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000));

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    if (!isBookableAppointmentEvent(event)) {
      continue;
    }

    var guest = getPrimaryGuest(event);
    var rawDescription = event.getDescription() || "(empty)";
    Logger.log("Title: " + event.getTitle());
    Logger.log("Guest email: " + guest.email);
    Logger.log("Guest name (CalendarApp): " + guest.name);
    Logger.log("Raw description:\n" + rawDescription);
    Logger.log("Plain text:\n" + htmlToPlainText(rawDescription));
    Logger.log("Raw HTML names: " + JSON.stringify(parseNamesFromRawHtml(rawDescription)));
    Logger.log("Gmail names: " + JSON.stringify(lookupBookingDetailsFromGmail(guest.email, event.getStartTime())));
    Logger.log("Parsed row: " + JSON.stringify(parseBookingFromCalendarEvent(event), null, 2));
    return;
  }

  Logger.log("No upcoming bookable appointment events found in the next 30 days.");
}
