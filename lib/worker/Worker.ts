// import { Worker } from "bullmq";
// import { NotificationModel } from "@/models/Notification";
// import { connection } from "../redisConn";

type IProcessNotification = {
  label?: string;
  type: string;
  from: string;
  to: string;
  read?: false;
  link?: string;
  data?: {
    name: string;
    price: string;
    id: string;
  };
};

require("dotenv").config();
const { Worker: BullWorker } = require("bullmq");
const { connection } = require("../redisConn");
const { startDb } = require("../startDb");
const { NotificationModel } = require("../../models/Notification");

interface Job<T = any> {
  data: T;
  name: string;
}

const worker = new BullWorker(
  "commerce",
  async (job: Job<IProcessNotification>) => {
    await startDb();
    console.log(job.data);
    if (job.name === "order") {
      const NotificationDoc = new NotificationModel({
        type: "order",
        label: job.data.label,
        from: job.data.from,
        to: job.data.to,
        link: job.data.link,
        data: {
          name: job.data.data?.name,
          price: job.data.data?.price,
          id: job.data.data?.id,
        },
      });
      await NotificationDoc.save();
    }
  },
  { connection: connection }
);

interface WorkerErrorEvent {
  (err: Error): void;
}

worker.on("error", (err: Error) => {
  // log the error
  console.error("worker error:", err);
});

// worker.on("progress", (job: Job, progress: number | object) => {
//   // Do something with the return value.
//   console.error("worker progress job:", progress);
// });

// worker.on("completed", (job: Job, returnvalue: any) => {
//   // Do something with the return value.
//   console.error("worker complete job:", job);
// });
