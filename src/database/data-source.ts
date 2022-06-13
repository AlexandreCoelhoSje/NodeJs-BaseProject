import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    // host: "localhost",
    // port: 5432,
    // username: "test",
    // password: "test",
    database: "src/database/database.sqlite",
    // synchronize: true,
    // logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"]
    // subscribers: [],
})