import { Queue } from "bullmq";
import { connection } from "../redisConn";

export const myCommerceQueue = new Queue("commerce", {
  connection: connection,
});
