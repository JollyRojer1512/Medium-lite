import "reflect-metadata";
import * as sm from "source-map-support";
import { Container } from "../dependencies";
import { Symbols } from "../dependencies/symbols";
import { UserService } from "../architecture/service/main/user";

sm.install();

async function start(): Promise<void> {
  await Container.init();
  const userService = Container.Services.get<UserService>(
    Symbols.Architecture.Service.Main.User
  );
  const result = await userService.createNew({
    email: "test@email.com",
    password: "testPassword2",
  });

  console.log(result);
}

setImmediate(start);

async function stop(event: string): Promise<void> {
  console.log(`Incoming Signal: ${event}`);
  await Container.close();
  console.log("Main api end");
  process.exit(0);
}

process.on("SIGINT", stop.bind(null, "SIGINT"));
process.on("SIGTERM", stop.bind(null, "SIGTERM"));

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
