import { scoreEngine }
  from "./engine/scoreEngine.js";

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
  const compressionValue =
    document.getElementById("compressionInput")?.value.trim() || "";

  return {

    ...diagnosticState,

    compression:
      compressionValue === ""
        ? null
        : Number(compressionValue)

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

      if (
        state.compression !== null &&
        (
          !Number.isFinite(state.compression) ||
          state.compression < 0 ||
          state.compression > 300
        )
      ) {
        alert("Enter a compression reading from 0 to 300 PSI.");
        return;
      }

      const rankedResults =
        scoreEngine(state);

      advancedResults.replaceChildren();

      const heading = document.createElement("h3");
      heading.textContent = "Ranked likely causes";
      advancedResults.appendChild(heading);

      if (rankedResults.length === 0) {
        const emptyState = document.createElement("p");
        emptyState.textContent =
          "Select one or more present symptoms or enter a compression reading to see ranked results.";
        advancedResults.appendChild(emptyState);
        return;
      }

      const appendList = (container, title, items) => {
        if (!items.length) return;

        const listHeading = document.createElement("h4");
        listHeading.textContent = title;
        container.appendChild(listHeading);

        const list = document.createElement("ul");
        items.forEach(item => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          list.appendChild(listItem);
        });
        container.appendChild(list);
      };

      rankedResults.forEach((result, index) => {
        const card = document.createElement("article");
        card.className = "diagnosis-card";

        const causeHeading = document.createElement("h4");
        causeHeading.textContent = `${index + 1}. ${result.name}`;
        card.appendChild(causeHeading);

        const confidence = document.createElement("p");
        confidence.textContent =
          `${result.confidence}% confidence - Score ${result.score} - ` +
          `${result.difficulty} - ${result.repairTime}`;
        card.appendChild(confidence);

        appendList(card, "Inspections", result.inspections);
        appendList(card, "Tests", result.tests);
        appendList(card, "Recommended repairs", result.repairs);

        if (result.procedure) {
          const procedureHeading = document.createElement("h4");
          procedureHeading.textContent = result.procedure.title;
          card.appendChild(procedureHeading);

          appendList(card, "Safety", result.procedure.safety);
          appendList(card, "Tools", result.procedure.tools);
          appendList(card, "Procedure", result.procedure.steps);
        }

        advancedResults.appendChild(card);
      });

      console.log("Ranked diagnostic results:", rankedResults);

    }
  );

}

/* =====================================
   APP STARTUP
===================================== */

showView("homeView");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch(error => {
        console.error("Service worker registration failed:", error);
      });
  });
}

console.log(
  "2-Stroke Tech Assistant Loaded"
);
