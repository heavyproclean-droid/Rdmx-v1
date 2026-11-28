/* =====================================
   2-STROKE TECH ASSISTANT
   APP.JS
===================================== */

/* =====================================
   MENU / NAVIGATION
===================================== */

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("open");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    sideMenu.classList.remove("open");
  });
}

/* =====================================
   VIEW MANAGEMENT
===================================== */

const views = document.querySelectorAll(".view");

function showView(viewId) {

  views.forEach(view => {
    view.classList.add("hidden");
  });

  const selectedView =
    document.getElementById(viewId);

  if (selectedView) {
    selectedView.classList.remove("hidden");
  }

  sideMenu.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document
  .querySelectorAll("[data-view]")
  .forEach(item => {

    item.addEventListener("click", () => {

      const target =
        item.dataset.view;

      showView(target);

    });

  });

/* =====================================
   ONLINE / OFFLINE STATUS
===================================== */

const connectionStatus =
  document.getElementById("connectionStatus");

function updateConnectionStatus() {

  if (!connectionStatus) return;

  if (navigator.onLine) {

    connectionStatus.textContent =
      "🟢 Online";

    connectionStatus.classList.remove("offline");
    connectionStatus.classList.add("online");

  } else {

    connectionStatus.textContent =
      "🔴 Offline";

    connectionStatus.classList.remove("online");
    connectionStatus.classList.add("offline");
  }
}

window.addEventListener(
  "online",
  updateConnectionStatus
);

window.addEventListener(
  "offline",
  updateConnectionStatus
);

updateConnectionStatus();

/* =====================================
   PWA INSTALL
===================================== */

let deferredPrompt;

const installBtn =
  document.getElementById("installBtn");

window.addEventListener(
  "beforeinstallprompt",
  (event) => {

    event.preventDefault();

    deferredPrompt = event;

    if (installBtn) {
      installBtn.hidden = false;
    }
  }
);

if (installBtn) {

  installBtn.addEventListener(
    "click",
    async () => {

      if (!deferredPrompt) return;

      deferredPrompt.prompt();

      const choice =
        await deferredPrompt.userChoice;

      console.log(
        "Install choice:",
        choice.outcome
      );

      deferredPrompt = null;

      installBtn.hidden = true;
    }
  );
}

/* =====================================
   SERVICE LOGS
===================================== */

const saveLogBtn =
  document.getElementById("saveLog");

const exportLogsBtn =
  document.getElementById("exportLogs");

const backupLogsBtn =
  document.getElementById("backupLogs");

function getLogs() {

  return JSON.parse(
    localStorage.getItem("serviceLogs")
  ) || [];
}

function saveLogs(logs) {

  localStorage.setItem(
    "serviceLogs",
    JSON.stringify(logs)
  );
}

if (saveLogBtn) {

  saveLogBtn.addEventListener(
    "click",
    () => {

      const machine =
        document.getElementById("machine")
          ?.value
          .trim();

      const notes =
        document.getElementById("notes")
          ?.value
          .trim();

      if (!machine) {

        alert(
          "Please enter a machine name."
        );

        return;
      }

      const logs = getLogs();

      logs.push({

        machine,

        notes,

        date:
          new Date().toLocaleString()

      });

      saveLogs(logs);

      alert("Service log saved.");

      document.getElementById("machine").value = "";
      document.getElementById("notes").value = "";
    }
  );
}

/* =====================================
   EXPORT LOGS
===================================== */

if (exportLogsBtn) {

  exportLogsBtn.addEventListener(
    "click",
    () => {

      const logs = getLogs();

      const blob = new Blob(
        [JSON.stringify(logs, null, 2)],
        {
          type: "application/json"
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "service-logs.json";

      link.click();

      URL.revokeObjectURL(url);
    }
  );
}

/* =====================================
   BACKUP ENTIRE APP DATA
===================================== */

if (backupLogsBtn) {

  backupLogsBtn.addEventListener(
    "click",
    () => {

      const backupData = {

        serviceLogs:
          getLogs(),

        exported:
          new Date().toISOString(),

        version:
          "1.0"

      };

      const blob = new Blob(

        [
          JSON.stringify(
            backupData,
            null,
            2
          )
        ],

        {
          type:
            "application/json"
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "2stroke-assistant-backup.json";

      link.click();

      URL.revokeObjectURL(url);

    }
  );
}

/* =====================================
   AUDIO PLACEHOLDER
===================================== */

const startAudioBtn =
  document.getElementById(
    "startAudioBtn"
  );

const stopAudioBtn =
  document.getElementById(
    "stopAudioBtn"
  );

if (startAudioBtn) {

  startAudioBtn.addEventListener(
    "click",
    () => {

      alert(
        "Audio Diagnostics coming soon."
      );
    }
  );
}

if (stopAudioBtn) {

  stopAudioBtn.addEventListener(
    "click",
    () => {

      console.log(
        "Future audio recording stop."
      );
    }
  );
}

/* =====================================
   RESTORE BACKUP
   (for future file picker)
===================================== */

const restoreButton =
  document.getElementById(
    "restoreBackup"
  );

if (restoreButton) {

  restoreButton.addEventListener(
    "click",
    () => {

      const fileInput =
        document.getElementById(
          "restoreFile"
        );

      const file =
        fileInput?.files?.[0];

      if (!file) {

        alert(
          "Select a backup file."
        );

        return;
      }

      const reader =
        new FileReader();

      reader.onload = (event) => {

        try {

          const data =
            JSON.parse(
              event.target.result
            );

          if (
            data.serviceLogs
          ) {

            localStorage.setItem(
              "serviceLogs",
              JSON.stringify(
                data.serviceLogs
              )
            );

            alert(
              "Backup restored."
            );

          } else {

            throw new Error();
          }

        } catch {

          alert(
            "Invalid backup file."
          );

        }
      };

      reader.readAsText(file);
    }
  );
}

/* =====================================
   GUIDED DIAGNOSTICS
===================================== */

const beginDiagnosisBtn =
  document.getElementById("beginDiagnosis");

const symptomSelect =
  document.getElementById("symptom");

const questionsContainer =
  document.getElementById("questions");

const diagnosticResult =
  document.getElementById("diagnosticResult");

window.renderNode = function(nodeId) {

  const node =
    window.diagnosticTree[nodeId];

  if (!node) return;

  questionsContainer.innerHTML = "";
  diagnosticResult.innerHTML = "";

  // Final diagnosis node
  if (node.diagnosis) {

    diagnosticResult.innerHTML = `
      <h3>${node.diagnosis}</h3>
      <p>Probability: ${node.probability}%</p>
      <h4>Recommended Repairs</h4>
      <ul>
        ${node.repairs
          .map(
            repair =>
              `<li>${repair}</li>`
          )
          .join("")}
      </ul>
    `;

    return;
  }

  // Question node

  const question =
    document.createElement("h3");

  question.textContent =
    node.question;

  questionsContainer.appendChild(
    question
  );

 node.options.forEach(option => {

  questionsContainer.innerHTML += `
    <button
      type="button"
      onclick="renderNode('${option.next}')"
      style="
        display:block;
        width:100%;
        margin:10px 0;
        padding:15px;
      ">
      ${option.text}
    </button>
  `;

});

}

if (beginDiagnosisBtn) {

  beginDiagnosisBtn.addEventListener(
    "click",
    () => {

      const symptom =
        symptomSelect.value;

      if (!symptom) {

        alert(
          "Please select a symptom."
        );

        return;
      }

      const symptomMap = {
        nostart: "no_start_spark",
        dies: "starts_dies_idle",
        nospark: "ignition_failure",
        overheat: "low_compression",
        bogging: "bog_wot_filter",
        smoke: "smoke_mix"
      };

      const startNode =
        symptomMap[symptom];

      renderNode(startNode);

    }
  );


}

/* =====================================
   ADVANCED DIAGNOSTICS
===================================== */

const diagnosticState = {};

document
  .querySelectorAll(".symptom-tile")
  .forEach(tile => {

    const symptom =
      tile.dataset.symptom;

    diagnosticState[symptom] = null;

    tile.addEventListener(
      "click",
      () => {

        const currentState =
          diagnosticState[symptom];

        if (currentState === null) {

          diagnosticState[symptom] = true;

          tile.classList.remove(
            "negative"
          );

          tile.classList.add(
            "active"
          );

        } else if (
          currentState === true
        ) {

          diagnosticState[symptom] = false;

          tile.classList.remove(
            "active"
          );

          tile.classList.add(
            "negative"
          );

        } else {

          diagnosticState[symptom] = null;

          tile.classList.remove(
            "active",
            "negative"
          );

        }

      }
    );

  });

function buildDiagnosticState() {

  return {

    ...diagnosticState,

    compression:
      Number(
        document.getElementById(
          "compressionInput"
        )?.value || 0
      )

  };

}

const runAdvancedBtn =
  document.getElementById(
    "runAdvancedDiagnosis"
  );

const advancedResults =
  document.getElementById(
    "advancedResults"
  );

if (
  runAdvancedBtn &&
  advancedResults
) {

  runAdvancedBtn.addEventListener(
    "click",
    () => {

      const state =
        buildDiagnosticState();

      advancedResults.innerHTML = `
        <h3>Diagnostic State</h3>

        <pre>${JSON.stringify(
          state,
          null,
          2
        )}</pre>
      `;

      console.log(
        "Diagnostic State:",
        state
      );

    }
  );

},

/* =====================================
   APP STARTUP
===================================== */

showView("homeView");

console.log(
  "2-Stroke Tech Assistant Loaded"
);


console.log(
  "2-Stroke Tech Assistant Loaded"
);
