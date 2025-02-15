const electron = require('electron');
const { app } = electron; //Accessing the app property of electron object

//watch for event ready and execute function on action
app.on('ready', () => {

    const mainWindow = new electron.BrowserWindow({});
    mainWindow.loadURL(`file:${__dirname}/index.html`);
});