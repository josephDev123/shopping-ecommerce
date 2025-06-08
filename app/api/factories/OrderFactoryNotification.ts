import { INotification } from "@/models/Notification";
import { IProcessNotification } from "../service/Notification";
import { Queue } from "bullmq";
import { Model } from "mongoose";

export async function OrderFactoryNotification(
  data: IProcessNotification,
  OrderQueue: Queue
) {
  const payload: IProcessNotification = {
    type: "Order",
    label: `${data.from} made Order:`,
    from: data.from,
    to: data.to,
    link: `${process.env.NEXT_PUBLIC_BASEURL}/shop/${data.data?.id}`,
    data: {
      name: data.data?.name!,
      price: data.data?.price!,
      id: data.data?.id!,
    },
  };

  const Job = await OrderQueue.add("order", payload);
}
