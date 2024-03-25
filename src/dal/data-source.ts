import path from 'path'
import { DataSourceOptions } from "typeorm"
import { app } from 'electron'

let DB_PATH = path.join(app.getAppPath(), '/src/dal/data/database.db')
if (import.meta.env.MODE === 'production') {
  // 安装好后，就在app的根目录下
  DB_PATH = path.join(app.getAppPath(), './database.db')
}

const dataSourceOptions: DataSourceOptions = {
  type: "better-sqlite3",
  entities: [
    "src/dal/entities/*.ts"
  ],
  database: DB_PATH,
  synchronize: true,
}

export default dataSourceOptions
