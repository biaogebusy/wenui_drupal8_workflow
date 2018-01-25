const electron   = window.require('electron');
const remote     = electron.remote;
const Menu       = remote.Menu;

const _menu = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建项目',
                accelerator: 'CmdOrCtrl+N',
                click: function (item, focusedWindow) {
                    newProjectFn();
                }
            },
            {
                label: '打开项目…',
                accelerator: 'CmdOrCtrl+O',
                click: function (item, focusedWindow) {
                    let _path = remote.dialog.showOpenDialog({ properties: [ 'openDirectory' ]});
                    if(_path && _path.length){
                        openProject(_path[0]);
                    }
                }
            },
            {
                label: '刷新',
                accelerator: 'CmdOrCtrl+R',
                click: function(item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: '重做',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }
        ]
    },
    {
        label: '运行',
        submenu: [
            {
                label: '执行 开发流程',
                accelerator: 'CmdOrCtrl+1',
                click: function (item, focusedWindow) {
                    runTask('dev');
                }
            },
            {
                label: '执行 生产流程',
                accelerator: 'CmdOrCtrl+2',
                click: function (item, focusedWindow) {
                    runTask('dist');
                }
            },
            {
                label: 'Zip 打包',
                accelerator: 'CmdOrCtrl+4',
                click: function (item, focusedWindow) {
                    runTask('zip');
                }
            }
        ]
    },
    {
        label: '项目',
        submenu: [
            {
                label: '进入当前项目配置',
                accelerator: 'CmdOrCtrl+/',
                click: function (item, focusedWindow) {
                    settingCurrentProject();
                }
            },
            {
                label: '删除当前选中项目',
                accelerator: 'CmdOrCtrl+shift+D',
                click: function (item, focusedWindow) {
                    delProject();
                }
            }
        ]
    },
    {
        label: '窗口',
        role: 'window',
        submenu: [
            {
                label: '最小化',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: '关闭窗口',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: '调试模式',
                accelerator: 'Option+CmdOrCtrl+I',
                click: function () {
                    if(remote.getCurrentWindow().webContents.isDevToolsOpened()){
                        remote.getCurrentWindow().webContents.closeDevTools();
                    }else{
                        remote.getCurrentWindow().webContents.openDevTools({mode: 'undocked'});
                    }
                }
            }
        ]
    },
    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: '使用帮助',
                click: function () {
                    electron.shell.openExternal('https://github.com/wenroo/wenui');
                }
            },
            {
                label: 'Davyin 官网',
                click: function () {
                    electron.shell.openExternal('http://davyin.com');
                }
            },
            {
                label: '建议 或 反馈…',
                click: function () {
                    electron.shell.openExternal('https://github.com/wenroo/wenui');
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    var name = remote.app.getName();
    _menu.unshift({
        label: name,
        submenu: [
            {
                label: '关于',
                click: function (item, focusedWindow) {
                    showAbout();
                }
            },
            {
                type: 'separator'
            },
            {
                label: '偏好设置',
                accelerator: 'CmdOrCtrl+,',
                click: function () {
                    settingFn();
                }
            },
            {
                label: '检查更新…',
                accelerator: '',
                click: function () {
                    checkForUpdate(true);
                }
            },
            {
                type: 'separator'
            },
            {
                label: '退出',
                accelerator: 'Command+Q',
                click: function () {
                    stopWatch();
                    remote.app.quit();
                }
            }
        ]
    });
}else if(process.platform === 'win32'){
    let helpItem = _menu[_menu.length-1];

    helpItem.submenu.unshift({
        label: '检查更新…',
        accelerator: '',
        click: function () {
          checkForUpdate(true);
        }
    });

    helpItem.submenu.unshift({
        label: '关于',
        click: function (item, focusedWindow) {
          showAbout();
        }
    });
}

var menu = Menu.buildFromTemplate(_menu);
Menu.setApplicationMenu(menu);
