import { IProcessNotification } from "../service/Notification";
import { Queue } from "bullmq";

export class NotificationFactoryBase {
  constructor(private readonly Queue: Queue) {}

  async process(data: IProcessNotification) {
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
  data: IProcessNotification,
  OrderQueue: Queue
) {
  const payload: IProcessNotification = {
    type: data.type,
    label: `${data.from} made Order:`,
    from: data.from,
    to: data.to,
    link: `${process.env.SERVER_BASEURL}/shop/${data.data?.id}`,
    data: {
      name: data.data?.name!,
      price: data.data?.price!,
      id: data.data?.id!,
    },
  };

  const Job = await OrderQueue.add("order", payload);
}
