const textArea = document.getElementById("textArea");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");
const statusBox = document.getElementById("status");

let statusTimeoutId = null;

if (!navigator.clipboard) {
  pasteBtn.classList.add("btn-disabled");
  pasteBtn.disabled = true;
  showStatus("Clipboard API not supported.", "error");
}


function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = "status";
  statusBox.classList.add(type);

  if (statusTimeoutId) {
    clearTimeout(statusTimeoutId);
  }

  statusTimeoutId = setTimeout(function () {
    statusBox.textContent = "";
    statusBox.className = "status";
  }, 2000);
}



copyBtn.addEventListener("click", function () {
  const text = textArea.value;

  navigator.clipboard.writeText(text)
    .then(function () {
      showStatus("Copied!", "success");
    })
    .catch(function () {
      showStatus("Failed to copy.", "error");
    });
});



pasteBtn.addEventListener("click", function () {
  navigator.clipboard.readText()
    .then(function (text) {
      textArea.value = text;
      showStatus("Pasted!", "success");
    })
    .catch(function () {
      showStatus("Paste blocked.", "error");
    });
});
