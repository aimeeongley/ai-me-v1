const params = new URLSearchParams(window.location.search);
const selectedVendor = params.get("vendor");

const vendorNames = {
  veo: "Veo",
  hudl: "Hudl",
  pixellot: "Pixellot",
  catapult: "Catapult",
  xbotgo: "XbotGo",
 frogbox: "FrogBox",
other: "Other technology provider"
};

const assessmentTitle = document.getElementById("assessment-title");

if (selectedVendor && vendorNames[selectedVendor]) {
  assessmentTitle.textContent = vendorNames[selectedVendor] + " Assessment";
}

// Show a clear notice when vendor evidence is unavailable.
if (selectedVendor === "other") {
  document.querySelector(".evidence-date").style.display = "none";
  document.querySelector(".evidence-note").style.display = "none";
  document.getElementById("other-vendor-notice").style.display = "block";
}

const refusalOptions = document.querySelectorAll('input[name="recording-refusal"]');
const technicalControlsFollowup = document.getElementById("technical-controls-followup");
const originalCaptureFollowup = document.getElementById("original-capture-followup");

refusalOptions.forEach(function (option) {
  option.addEventListener("change", function () {
    if (option.value === "technical-controls") {
      technicalControlsFollowup.style.display = "block";
      originalCaptureFollowup.style.display = "block";
    } else {
      technicalControlsFollowup.style.display = "none";
      originalCaptureFollowup.style.display = "none";
    }
  });
});

const consentRecordOptions = document.querySelectorAll('input[name="consent-record"]');
const assessmentFindings = document.getElementById("assessment-findings");
const consentRecordFinding = document.getElementById("consent-record-finding");

consentRecordOptions.forEach(function (option) {
  option.addEventListener("change", function () {
    assessmentFindings.style.display = "block";

    if (option.value === "yes") {
      consentRecordFinding.innerHTML =
        "<h3>✓ Confirmed</h3><p>Your organisation reports that it keeps a current record of each child's filming and data permissions. Continue to review and update these records to reflect changes in consent, technology use and applicable legal requirements.</p>";
    } else if (option.value === "general-only") {
      consentRecordFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation has consent records, but individual filming and data choices are not currently recorded. Establish a Consent and Participant Record that can track each child's permissions and changes over time.</p>";
    } else if (option.value === "no") {
      consentRecordFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation reports that it does not currently keep a record of each child's filming and data permissions. Establish a Consent and Participant Record.</p>";
    } else if (option.value === "unsure") {
      consentRecordFinding.innerHTML =
        "<h3>? Not established</h3><p>AI Me could not establish whether your organisation keeps a current record of each child's filming and data permissions. Confirm how these permissions are currently recorded and updated.</p>";
    }
  });
});

const deletionRecordOptions = document.querySelectorAll('input[name="deletion-record"]');
const deletionRecordFinding = document.getElementById("deletion-record-finding");

deletionRecordOptions.forEach(function (option) {
  option.addEventListener("change", function () {
    deletionRecordFinding.style.display = "block";

    if (option.value === "yes-with-evidence") {
      deletionRecordFinding.innerHTML =
        "<h3>✓ Confirmed</h3><p>Your organisation reports that it records deletion requests, the actions taken and evidence confirming the deletion action. Continue to keep these records current and review the process when your technology or data practices change.</p>";
    } else if (option.value === "requests-only") {
      deletionRecordFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation records deletion requests but does not keep evidence of the deletion action. Add Deletion Evidence to your process so there is a record of what action was taken in response to each request.</p>";
    } else if (option.value === "no") {
      deletionRecordFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation reports that it does not keep a record of deletion requests and actions taken. Establish a process for recording deletion requests, the action taken and any evidence confirming that action.</p>";
    } else if (option.value === "never-received") {
      deletionRecordFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation has not received a deletion request. Establish a deletion request and record-keeping process before one is received, including how requests will be recorded, actioned and evidenced.</p>";
    } else if (option.value === "unsure") {
      deletionRecordFinding.innerHTML =
        "<h3>? Not established</h3><p>AI Me could not establish whether your organisation records deletion requests and the actions taken. Confirm the current process, including whether evidence of deletion action is retained.</p>";
    }
  });
});

const locateChildDataOptions = document.querySelectorAll('input[name="locate-child-data"]');
const locateChildDataFinding = document.getElementById("locate-child-data-finding");

locateChildDataOptions.forEach(function (option) {
  option.addEventListener("change", function () {
    locateChildDataFinding.style.display = "block";

    if (option.value === "yes") {
      locateChildDataFinding.innerHTML =
        "<h3>✓ Confirmed</h3><p>Your organisation reports that it can identify and locate relevant footage or data when a deletion request is received. Continue to review this process as technology, storage locations and data practices change.</p>";
    } else if (option.value === "some") {
      locateChildDataFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation can locate some relevant footage or data, but not all of it. Identify where other copies or data may exist, including recordings, clips, downloads and shared copies, and establish how they can be located when a request is received.</p>";
    } else if (option.value === "vendor") {
      locateChildDataFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation relies on the vendor or platform to locate relevant footage or data. Confirm what the vendor can locate, what your organisation must identify itself, and how a deletion request is passed to and actioned by the vendor.</p>";
    } else if (option.value === "no") {
      locateChildDataFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation reports that it cannot currently identify and locate relevant footage or data when a deletion request is received. Establish where footage and related data may exist and who is responsible for locating it.</p>";
    } else if (option.value === "not-tested") {
      locateChildDataFinding.innerHTML =
        "<h3>! Organisation Action Required</h3><p>Your organisation has not tested whether it can locate relevant footage or data. Test the process before a request is received so you know whether recordings, clips, downloads, shared copies and other relevant data can be identified.</p>";
    } else if (option.value === "unsure") {
      locateChildDataFinding.innerHTML =
        "<h3>? Not established</h3><p>AI Me could not establish whether your organisation can identify and locate relevant footage or data. Confirm where the data may exist and how it would be located if a deletion request were received.</p>";
    }
  });
});

// KNOW: Load the available Veo evidence.
if (selectedVendor === "veo") {
  fetch("data/vendors/veo-evidence.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load Veo evidence");
      }
      return response.json();
    })
    .then(function (data) {
      const quickCheck = document.getElementById("vendor-quick-check-content");
      const records = data.evidence;

      if (!Array.isArray(records) || records.length === 0) {
  quickCheck.textContent = "No vendor evidence records available.";
  return;
}

records.forEach(function (record) {


      const heading = document.createElement("h4");
      heading.textContent = record.question;

      const finding = document.createElement("p");
      finding.textContent = record.finding;

      const status = document.createElement("p");
      status.textContent = "Evidence status: " + record.evidenceStatus;

      const action = document.createElement("p");
      if (record.organisationAction &&
    record.organisationAction !== "No specific action identified for this finding.") {
  action.textContent = "Organisation action: " + record.organisationAction;
 
}

      quickCheck.append(heading, finding, status);

if (action.textContent) {
  quickCheck.appendChild(action);
}
      const evidenceLink = document.createElement("a");


const evidenceSources = {
  S1: {
    url: "https://www.veo.com/legal/terms",
    name: "Veo General Terms"
  },
  S2: {
    url: "https://www.veo.com/legal/privacy",
    name: "Veo Privacy Policy"
  },
  S3: {
    url: "https://cdn.prod.website-files.com/65a1660e61e47f70a246ac5c/6a8316bc361773e17ee39531_Veo%20-%20Data%20processing%20agreement%20-%2018%20August%202026.pdf",
    name: "Veo Data Processing Agreement"
  }
};

const source = evidenceSources[record.sourceId];

if (source) {
  evidenceLink.href = source.url;
  evidenceLink.textContent = "Show evidence: " + source.name;
}


evidenceLink.target = "_blank";
evidenceLink.rel = "noopener noreferrer";

quickCheck.appendChild(evidenceLink);
});
    })
    .catch(function () {
      document.getElementById("vendor-quick-check-content").textContent =
        "Veo evidence could not be loaded.";
    });
}


