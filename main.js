/********************************************************************
*  - Autor: Rafael Ochôa Mello                                      *
*  - Data: 25 de Junho de 2021                                      *
*  - Info:                                                          *
*        -> Este script é o principal para a renderização           *
*        da nossa janela.                                           *
*        -> Não utiliza os frames padrão, estes foram desa-         *
*        tivados.                                                   *
*        -> Foram implementados do zero, o controle e os             *
*        botões para:                                               *
*                Fechar, Maximizar e Minimizar                      *
*        -> Todos os controles e estilos da janela foram            *
*        implementados buscando não utilizar bibliotecas de         *
*        terceiros, neste caso sendo utilizado apenas:              *
*                     HTML, CSS e JS 'puro'                         * 
*********************************************************************/

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;

function createWindow() {
    const win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        },
        frame: false,
        show: false,
    });

    win.loadFile('src/index.html');

    //Captura de evento para fechar o window
    ipc.on('closeApp', () => { 
        console.log('Clicked on close button');
        win.close();
    });

    
    ipc.on('maximizeRestoreApp', () => { 
        console.log('Clicked on maximize/restore button');
        if(win.isMaximized())
            win.restore();
        else
            win.maximize();
    });


    ipc.on('minimizeApp', () => { 
        console.log('Clicked on minimize button');
        win.minimize();
    });


    //Só mostra a tela depois de tudo carregado, evita a 'tela branca de 2 segundos'
    win.once("ready-to-show", () => {
        win.show();
    });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});


