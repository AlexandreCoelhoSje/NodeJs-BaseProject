import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "sqlite",
    // host: "localhost",
    // port: 5432,
    // username: "test",
    // password: "test",
    //database: "src/database/database.test.sqlite",
    database: ":memory:",
    //dropSchema: true,
    //synchronize: true,
    //migrationsRun: true,
    // logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"]
    // subscribers: [],
});

export { AppDataSource }