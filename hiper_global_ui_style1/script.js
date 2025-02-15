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
