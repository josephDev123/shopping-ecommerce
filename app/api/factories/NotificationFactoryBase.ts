import { INotification } from "@/app/types/NotificationType";
import { Queue } from "bullmq";

export class NotificationFactoryBase {
  constructor(private readonly Queue: Queue | undefined) {}

  async process(data: Omit<INotification, "_id">) {
    switch (data.type) {
      case "Order":
        OrderFactoryNotification(data, this.Queue);
        break;

      default:
        console.log("No notification for this");
        break;
    }
  }
}

export async function OrderFactoryNotification(
  data: Omit<INotification, "_id">,
  OrderQueue: Queue | undefined
) {
  const payload: Omit<INotification, "_id"> = {
    type: data.type,
    label: `${data.from} made Order:`,
    from: data.from,
    to: data.to,
    link: `${process.env.SERVER_BASEURL}/shop/${data.metadata?.id}`,
    metadata: data.metadata,
  };

  const Job = await OrderQueue?.add("order", payload);
}
