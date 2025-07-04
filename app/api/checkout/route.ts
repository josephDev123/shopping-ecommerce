import { NextRequest, NextResponse } from "next/server";
import { paymentRepository } from "../repository/paymentRepository";
import { PaymentService } from "../service/PaymentService";
import OrderModel from "@/models/OrderModel";
import { startDb } from "@/lib/startDb";
import { myCommerceQueue } from "@/lib/BullMq/Queue";
import { NotificationFactoryBase } from "../factories/NotificationFactoryBase";
import { RouteHandlerMiddleware } from "@/app/utils/RouteHandlerMiddleware";

async function Checkout(req: NextRequest) {
  try {
    await startDb();
    const payload = await req.json();
    const NotificationFactoryBaseImpl = new NotificationFactoryBase(
      myCommerceQueue
    );
    const paymentRepo = new paymentRepository(OrderModel);
    const paymentService = new PaymentService(
      paymentRepo,
      NotificationFactoryBaseImpl
    );

    const result = await paymentService.create(payload);
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export const POST = RouteHandlerMiddleware(Checkout);
