const electron = require('electron');
const { app } = electron; //Accessing the app property of electron object

//watch for event ready and execute function on action
app.on('ready', () => {

    const mainWindow = new electron.BrowserWindow({
        width: 1920, // Default width
    height: 1080, // Default height
    minWidth: 1920, // Prevents excessive shrinking
    minHeight: 1080, // Keeps content readable
    });
    mainWindow.loadURL(`file:${__dirname}/index.html`);
});