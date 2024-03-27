import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ["src/entities/*{.ts,.js}"],
  migrationsTableName: "migration_table",
  migrations: ["src/migrations/*{.ts,.js}"],
  synchronize: false,
  logging: true,
});
