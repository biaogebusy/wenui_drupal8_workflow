"use strict";

const path     = appRequire('path');
const fs       = appRequire('fs');
const electron = appRequire('electron');
const remote   = electron.remote;

const gulp     = appRequire('gulp');
const store    = appRequire('store');

class Common {

}

Common.NAME = 'WenUI';
Common.ROOT = path.join(__dirname, '../../../');
Common.WORKSPACE = `${Common.NAME}_workspace`;
Common.CONFIGNAME = 'theme.config.json';
Common.CONFIGPATH = path.join(Common.ROOT, '/source/config', Common.CONFIGNAME);
Common.PLATFORM = process.platform;
Common.DEFAULT_PATH = Common.PLATFORM === 'win32' ? 'desktop' : 'home';
Common.TEMPLAGE_PROJECT = path.resolve(path.join(__dirname, '../templates/project.zip'));
Common.TEMPLAGE_EXAMPLE = path.resolve(path.join(__dirname, '../templates/example.zip'));
Common.EXAMPLE_NAME = 'WenUI';
Common.CHECKURL = 'https://github.com/wenroo/wenui/master/package.json';
Common.DOWNLOADURL = 'https://github.com/wenroo/wenui/releases';

Common.requireUncached = function (module) {
    delete global.require.cache[global.require.resolve(module)];
    return require(module);
}

Common.fileExist = function (filePath) {
    try {
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw new Error(err);
        }
    }
};

Common.dirExist = function (dirPath) {
    try {
        var stat = fs.statSync(dirPath);
        if (stat.isDirectory()) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw new Error(err);
        }
    }
}


module.exports = Common;
