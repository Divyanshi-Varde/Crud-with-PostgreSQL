import express from "express";
import { AppDataSource } from "./config/data.config";
import { setupRoutes } from "./routes/crud.routes";
import { setupAuthRoutes } from "./routes/auth.routes";
import { User } from "./entities/users.entity";


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
