/************************************************************************   
*  - Autor: Rafael Ochôa Mello                                          *
*  - Data: 25 de Junho de 2021                                          *
*  - Info:                                                              *
*        -> Este script tem como objetivo capturar os eventos           *
*       disparados a partir do clique dos nosso botões do menu          *
*       superior.                                                       *
*       -> Não utilizamos o conceito de 'remote', ele está depreciado   *
*       e apresenta possíveis problemas ao ser utilizado em conjunto    *
*       com outras libs                                                 * 
*************************************************************************/

const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

maxResBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp');
});

minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp');
});

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp');
});

