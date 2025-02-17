function openTab(event, tabName) {
    // Hide all tab contents
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function(content) {
        content.classList.remove('active-tab');
    });

    // Remove 'active' class from all tab buttons
    var tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.classList.remove('active');
    });

    // Show the clicked tab content
    document.getElementById(tabName).classList.add('active-tab');

    // Add 'active' class to the clicked tab button
    event.currentTarget.classList.add('active');
}

// Select/Deselect All Servers
function toggleSelectAll() {
    let selectAll = document.getElementById("select-all").checked;
    let checkboxes = document.querySelectorAll(".server-option");
  
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAll;
    });
  }
  
  // Run Test
  function runTest(button, serverName, testType) {
    button.disabled = true;
    button.innerText = "Testing...";
  
    setTimeout(() => {
      let isSuccess = Math.random() > 0.5;
      let statusSpan = document.createElement("span");
  
      if (isSuccess) {
        statusSpan.classList.add("status", "status-success");
        statusSpan.innerText = "✔ Success";
      } else {
        statusSpan.classList.add("status", "status-failed");
        statusSpan.innerText = "❌ Failed";
  
        let retryBtn = document.createElement("button");
        retryBtn.innerText = "Retry";
        retryBtn.classList.add("retry-btn");
        retryBtn.onclick = () => retryTest(button, serverName, testType, statusSpan);
        statusSpan.appendChild(retryBtn);
      }
  
      button.replaceWith(statusSpan);
    }, 2000);
  }
  
  // Retry Test
  function retryTest(button, serverName, testType, statusSpan) {
    statusSpan.innerHTML = "⏳ Retesting...";
    statusSpan.classList.remove("status-success", "status-failed");
    statusSpan.classList.add("status-pending");
  
    setTimeout(() => {
      let isSuccess = Math.random() > 0.5;
      statusSpan.innerHTML = "";
  
      if (isSuccess) {
        statusSpan.classList.add("status-success");
        statusSpan.innerText = "✔ Success";
      } else {
        statusSpan.classList.add("status-failed");
        statusSpan.innerText = "❌ Failed";
  
        let retryBtn = document.createElement("button");
        retryBtn.innerText = "Retry";
        retryBtn.classList.add("retry-btn");
        retryBtn.onclick = () => retryTest(button, serverName, testType, statusSpan);
        statusSpan.appendChild(retryBtn);
      }
    }, 2000);
  }


  function updateStatus(action) {
    const checkboxes = document.querySelectorAll('.server-checkbox:checked');

    if (checkboxes.length === 0) {
        alert("Please select at least one server.");
        return;
    }

    checkboxes.forEach(checkbox => {
        const row = checkbox.closest("tr");
        let statusBtn;

        if (action === 'setup') {
            statusBtn = row.cells[2].querySelector("button"); // Setup Status Column
        } else if (action === 'load') {
            statusBtn = row.cells[3].querySelector("button"); // Load Status Column
        } else if (action === 'start') {
            statusBtn = row.cells[4].querySelector("button"); // Test Status Column
        }

        // Simulate a test run with a delay
        statusBtn.classList.remove("pending", "success", "failed");
        statusBtn.textContent = "Running...";
        statusBtn.classList.add("running");

        setTimeout(() => {
            const success = Math.random() > 0.3; // 70% success rate
            const logMessage = success ? "Test completed successfully." : generateErrorLog();

            if (success) {
                statusBtn.textContent = "Success";
                statusBtn.classList.remove("running");
                statusBtn.classList.add("success");
                statusBtn.dataset.log = logMessage; // Store log message
            } else {
                statusBtn.textContent = "Failed";
                statusBtn.classList.remove("running");
                statusBtn.classList.add("failed");
                statusBtn.dataset.log = logMessage; // Store log message
            }
        }, 2000); // Simulate a delay
    });
}

// Function to generate random log errors
function generateErrorLog() {
    const errors = [
        "Error 500: Internal Server Error",
        "Timeout Error: Server did not respond in time",
        "Connection Refused: Check firewall settings",
        "Invalid Response: Malformed JSON received",
        "Authentication Error: Invalid credentials",
        "Disk Full: Insufficient storage space"
    ];
    return errors[Math.floor(Math.random() * errors.length)];
}

// Function to show log details when clicking a status button
function showLog(button) {
    const logMessage = button.dataset.log || "No logs available.";
    alert(`Log Details:\n\n${logMessage}`);
}
  
