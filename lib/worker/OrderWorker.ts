import { Worker } from "bullmq";
import { NotificationModel } from "@/models/Notification";
import { connection } from "../redisConn";

const worker = new Worker(
  "commerce",
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log(job.data, job.name);
    if (job.name === "order") {
      const NotificationDoc = new NotificationModel({
        type: "order",
        label: job.data.label,
        from: job.data.from,
        to: job.data.to,
        link: job.data.link,
        data: {
          name: job.data.name,
          price: job.data.price,
          id: job.data.id,
        },
      });
      await NotificationDoc.save();
    }
  },
  { connection: connection }
);
