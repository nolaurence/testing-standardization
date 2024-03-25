import { join,resolve } from "path";
import {
  app,
} from "electron";
import dataSourceOptions from '../dal/data-source';
import {createWindow} from 'electron-prokit';
import ipc from './ipc'
import {DataSource, DataSourceOptions} from "typeorm";
import { initDb, readDb, writeDb } from "electron-prokit";

const initWindowsAction = () => {
  const mainWindow = createWindow('main',{
    width: 960,
    height: 720,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
      preload: join(__dirname, "../preload/index.cjs"),
    },
  })

  if (mainWindow) {
    if (import.meta.env.MODE === "dev") {
      if (import.meta.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
      }
    } else {
      mainWindow.loadFile(resolve(__dirname, "../render/index.html"));
    }
  }
}

let DB_JSON_PATH = join(app.getAppPath(), '/src/dal/data/database.db');
if (import.meta.env.MODE === 'production') {
  // 安装好后，就在app的根目录下
  DB_JSON_PATH = join(app.getAppPath(), './database.db');
}

app.whenReady().then(async () => {
  // 先启动数据库
  initDb(DB_JSON_PATH).then((res: any) => {
    console.log(res);
  }).catch((err: any) => Promise.reject(err));

  const result = await readDb("initialized");

  let options: DataSourceOptions;
  if (!result || result !== 'true') {
    options = dataSourceOptions;
  } else {
    options = {
      ...dataSourceOptions,
      synchronize: false,
    }
  }

  const appDataSource = new DataSource(options);
  appDataSource.initialize().then(() => {
    writeDb("initialized", "true");
  }).catch((err) => {
    return Promise.reject(err);
  });
  initWindowsAction()
  ipc()
})