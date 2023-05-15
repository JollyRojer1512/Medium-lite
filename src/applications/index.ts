import "reflect-metadata";
import * as sm from "source-map-support";
import { Container } from "../dependencies";
import { Server } from "../components/server";
import { Symbols } from "../dependencies/symbols";

sm.install();

async function start(): Promise<void> {
  await Container.init();
  const server = Container.Services.get<Server>(Symbols.Infrastructure.Server);

  server.listen();
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
