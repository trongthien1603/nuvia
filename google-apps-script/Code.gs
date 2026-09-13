/**
 * Nuvia Immigration — Contact Form → Google Drive (Google Sheets)
 *
 * SETUP (one-time, ~5 minutes):
 * 1. Sign in to https://script.google.com with nuvia.immigration@gmail.com
 * 2. New project → paste this entire file → Save as "Nuvia Contact Form"
 * 3. Run createSheet() once (authorize when prompted)
 *    → Creates folder "Nuvia Immigration" in Google Drive with spreadsheet inside
 * 4. Copy the SPREADSHEET_ID from the log (View → Executions) and paste below
 * 5. Run testWrite() once — authorize if prompted; confirm a test row appears in the sheet
 * 6. Deploy → New deployment → Web app
 *    - Execute as: Me (nuvia.immigration@gmail.com)
 *    - Who has access: Anyone
 * 7. Copy the Web app URL → paste into js/config.js as googleScriptUrl
 * 8. After any script change: Deploy → Manage deployments → Edit → New version → Deploy
 *
 * GOOGLE CALENDAR BOOKING (no Calendly):
 * 1. Open Google Calendar with nuvia.immigration@gmail.com
 * 2. Create → Appointment schedule → set availability
 * 3. Copy booking page URL → js/config.js googleCalendarBookingUrl
 */

var SPREADSHEET_ID = "PASTE_YOUR_SPREADSHEET_ID_HERE";
var DRIVE_FOLDER_NAME = "Nuvia Immigration";

function getOrCreateFolder() {
  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function testWrite() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_SPREADSHEET_ID_HERE") {
    throw new Error("Set SPREADSHEET_ID first. Run createSheet() and paste the ID from the log.");
  }

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Submissions");
  if (!sheet) {
    sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  }

  sheet.appendRow([new Date(), "Setup Test", "test@example.com", "", "other", "Apps Script test row — safe to delete", "en"]);
  Logger.log("Test row added. Open the spreadsheet in Google Drive to verify.");
}

function createSheet() {
  var folder = getOrCreateFolder();
  var ss = SpreadsheetApp.create("Nuvia Immigration — Contact Form Submissions");
  var file = DriveApp.getFileById(ss.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  var sheet = ss.getActiveSheet();
  sheet.setName("Submissions");
  sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Service", "Message", "Language"]);
  sheet.getRange("1:1").setFontWeight("bold");
  sheet.setFrozenRows(1);

  Logger.log("Spreadsheet created in Google Drive folder: " + DRIVE_FOLDER_NAME);
  Logger.log("SPREADSHEET_ID: " + ss.getId());
  Logger.log("URL: " + ss.getUrl());
}

function doPost(e) {
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID === "PASTE_YOUR_SPREADSHEET_ID_HERE") {
      return jsonResponse({ success: false, error: "SPREADSHEET_ID not configured in Apps Script" });
    }

    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Submissions");
    if (!sheet) {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    }

    var data = {};
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var row = [
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.service || "",
      data.message || "",
      data.language || "en",
    ];

    sheet.appendRow(row);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doGet() {
  return jsonResponse({ status: "ok", service: "Nuvia Immigration Contact Form" });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
