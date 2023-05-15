import "reflect-metadata";
import * as sm from "source-map-support";

sm.install();

async function start(): Promise<void> {
    console.log("Hello World")
}

setImmediate(start);


async function stop(event: string): Promise<void> {
    console.log(`Incoming Signal: ${event}`);


    console.log("Main api end");
    process.exit(0);
}

//catches ctrl+c event
process.on("SIGINT", stop.bind(null, "SIGINT"));
process.on("SIGTERM", stop.bind(null, "SIGTERM"));

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
