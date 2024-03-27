import express from "express";
import dotenv from "dotenv";
import { setupRoutes } from "./routes/crud.routes";
import { setupAuthRoutes } from "./routes/auth.routes";
import { DataSource } from "typeorm";
import { User } from "./entities/users.entity";
import "reflect-metadata";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ["src/entities/*{.ts,.js}"],
  // migrationsTableName: "",
  // migrations: ["src/migrations/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setupAuthRoutes());
app.use(setupRoutes());

// const userRepo = AppDataSource.getRepository(User);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    // const usersData = [
    //   { username: "Div Varde", password: "div@1323A", role: "Trainee" },
    //   { username: "Parth Desai", password: "parth@343F", role: "Student" },
    //   {
    //     username: "Krupa Yadav",
    //     password: "krupaE#12",
    //     role: "Assistant Professor",
    //   },
    // ];

    // const userRepository = AppDataSource.getRepository(User);
    // for (const userData of usersData) {
    //   const user = userRepository.create(userData);
    //   userRepository.save(user);
    // }

    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
