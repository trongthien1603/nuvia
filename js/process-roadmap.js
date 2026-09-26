(function () {
  const ROAD_VIEW = 1000;
  const STEP_PATH_RANGES = [
    [0.06, 0.26],
    [0.26, 0.46],
    [0.46, 0.66],
    [0.72, 0.98],
  ];
  const MOBILE_MQ = window.matchMedia("(max-width: 767px)");

  let roadmapEl = null;
  let pathEl = null;
  let resizeTimer = null;

  function debounceLayout() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutProcessRoadmap, 80);
  }

  function svgPointToRoadmap(path, length, svg, roadmap) {
    const pt = path.getPointAtLength(length);
    const svgRect = svg.getBoundingClientRect();
    const roadRect = roadmap.getBoundingClientRect();
    if (!svgRect.width || !svgRect.height) return null;

    return {
      x: (pt.x / ROAD_VIEW) * svgRect.width + svgRect.left - roadRect.left,
      y: (pt.y / ROAD_VIEW) * svgRect.height + svgRect.top - roadRect.top,
    };
  }

  function fractionForRoadY(path, targetY, svg, roadmap, tMin, tMax) {
    const len = path.getTotalLength();
    let bestT = tMin;
    let bestDist = Infinity;

    for (let i = 0; i <= 120; i++) {
      const t = tMin + (i / 120) * (tMax - tMin);
      const coords = svgPointToRoadmap(path, len * t, svg, roadmap);
      if (!coords) continue;
      const dist = Math.abs(coords.y - targetY);
      if (dist < bestDist) {
        bestDist = dist;
        bestT = t;
      }
    }

    return bestT;
  }

  function placeTerminalMarker(el, coords) {
    if (!el || !coords) return;
    el.style.left = `${coords.x}px`;
    el.style.top = `${coords.y}px`;
    el.style.transform = "translate(-50%, -50%)";
  }

  function clearNodeStyles(node) {
    node.style.left = "";
    node.style.right = "";
    node.style.top = "";
    node.style.transform = "";
    node.style.marginLeft = "";
    node.style.position = "";
  }

  function layoutProcessRoadmap() {
    if (!roadmapEl || !pathEl) return;

    const svg = roadmapEl.querySelector(".process-roadmap-curve");
    const journey = roadmapEl.querySelector(".process-journey");
    const steps = [...roadmapEl.querySelectorAll(".process-journey-step")];
    const startMarker = roadmapEl.querySelector(".process-roadmap-marker--start");
    const endMarker = roadmapEl.querySelector(".process-roadmap-marker--end");
    if (!svg || !journey || !steps.length) return;

    roadmapEl.style.minHeight = "";
    svg.style.height = "";
    journey.style.paddingTop = "2.75rem";
    journey.style.paddingBottom = "1.25rem";

    let roadmapHeight = Math.max(journey.offsetHeight + 16, 520);
    roadmapEl.style.minHeight = `${roadmapHeight}px`;
    svg.style.height = `${roadmapHeight}px`;

    const roadRect = roadmapEl.getBoundingClientRect();
    const len = pathEl.getTotalLength();
    const isMobile = MOBILE_MQ.matches;

    steps.forEach((step, index) => {
      const node = step.querySelector(".process-journey-node");
      if (!node) return;

      clearNodeStyles(node);

      const stepRect = step.getBoundingClientRect();
      const stepCenterY = stepRect.top - roadRect.top + stepRect.height / 2;
      const range = STEP_PATH_RANGES[index] || [0.1, 0.9];
      const fraction = fractionForRoadY(
        pathEl,
        stepCenterY,
        svg,
        roadmapEl,
        range[0],
        range[1]
      );
      const coords = svgPointToRoadmap(pathEl, len * fraction, svg, roadmapEl);
      if (!coords) return;

      if (isMobile) {
        node.style.position = "absolute";
        node.style.left = `${coords.x - (stepRect.left - roadRect.left)}px`;
        node.style.top = `${coords.y - (stepRect.top - roadRect.top)}px`;
        node.style.transform = "translate(-50%, -50%)";
        return;
      }

      const targetX = coords.x - (stepRect.left - roadRect.left);
      const stepMid = stepRect.width / 2;
      const delta = Math.max(-36, Math.min(36, targetX - stepMid));
      node.style.transform = delta ? `translateX(${delta}px)` : "";
    });

    const lastStep = steps[steps.length - 1];
    const lastNode = lastStep.querySelector(".process-journey-node");
    const lastRect = lastStep.getBoundingClientRect();
    const lastCenterY = lastRect.top - roadRect.top + lastRect.height / 2;

    const startCoords = svgPointToRoadmap(pathEl, 0, svg, roadmapEl);
    let endCoords = svgPointToRoadmap(pathEl, len, svg, roadmapEl);

    if (startCoords) {
      startCoords.y = Math.min(startCoords.y, 28);
      placeTerminalMarker(startMarker, startCoords);
    }

    if (endCoords) {
      const endFraction = fractionForRoadY(
        pathEl,
        lastCenterY,
        svg,
        roadmapEl,
        0.88,
        1
      );
      endCoords = svgPointToRoadmap(pathEl, len * endFraction, svg, roadmapEl) || endCoords;

      if (lastNode && !isMobile) {
        const stepRect = lastStep.getBoundingClientRect();
        const nodeMid = stepRect.left - roadRect.left + stepRect.width / 2;
        const delta = lastNode.style.transform?.match(/translateX\(([-\d.]+)px\)/);
        const nodeShift = delta ? parseFloat(delta[1]) : 0;
        endCoords.x = Math.max(endCoords.x, nodeMid + nodeShift + 28);
      }

      const roadBottom = endCoords.y + 36;
      const contentBottom = lastRect.bottom - roadRect.top + 12;
      roadmapHeight = Math.max(roadmapHeight, roadBottom, contentBottom);
      roadmapEl.style.minHeight = `${roadmapHeight}px`;
      svg.style.height = `${roadmapHeight}px`;

      endCoords = svgPointToRoadmap(pathEl, len * endFraction, svg, roadmapEl) || endCoords;
      if (lastNode && !isMobile) {
        const stepRect = lastStep.getBoundingClientRect();
        const nodeMid = stepRect.left - roadRect.left + stepRect.width / 2;
        const delta = lastNode.style.transform?.match(/translateX\(([-\d.]+)px\)/);
        const nodeShift = delta ? parseFloat(delta[1]) : 0;
        endCoords.x = Math.max(endCoords.x, nodeMid + nodeShift + 28);
      }

      placeTerminalMarker(endMarker, endCoords);
    }

    roadmapEl.classList.add("process-roadmap--anchored");
  }

  function initProcessRoadmap() {
    roadmapEl = document.querySelector(".process-roadmap--wide");
    if (!roadmapEl) return;

    pathEl = roadmapEl.querySelector(".process-roadmap-road--curve");
    if (!pathEl || typeof pathEl.getTotalLength !== "function") return;

    layoutProcessRoadmap();
    requestAnimationFrame(() => requestAnimationFrame(layoutProcessRoadmap));

    window.addEventListener("resize", debounceLayout, { passive: true });
    window.addEventListener("orientationchange", debounceLayout, { passive: true });
    MOBILE_MQ.addEventListener("change", layoutProcessRoadmap);

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(debounceLayout);
      ro.observe(roadmapEl);
      const journey = roadmapEl.querySelector(".process-journey");
      if (journey) ro.observe(journey);
    }

    document.fonts?.ready?.then(debounceLayout);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProcessRoadmap);
  } else {
    initProcessRoadmap();
  }

  window.NuviaProcessRoadmap = { relayout: layoutProcessRoadmap };
})();
