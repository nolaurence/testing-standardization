import path from 'path'
import { DataSource } from "typeorm"
import { app } from 'electron'
import { BetterSqlite3ConnectionOptions} from "typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions"
import {User} from './entities.ts'

const basePath = path.join(
  app.getPath('userData'),
  app.getName(),
  `./data/database.db`
)

const options: BetterSqlite3ConnectionOptions = {
  type: "better-sqlite3",
  entities: [
    "src/dal/entities/*.ts"
  ],
  database: basePath,
  synchronize: true,
}

const AppDataSource = new DataSource(options)

export default AppDataSource
