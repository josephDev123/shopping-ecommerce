import { NextRequest, NextResponse } from "next/server";
import { paymentRepository } from "../repository/paymentRepository";
import { PaymentService } from "../service/PaymentService";
import OrderModel from "@/models/OrderModel";
import { startDb } from "@/lib/startDb";
// import { myCommerceQueue } from "@/lib/BullMq/Queue";
// import { NotificationFactoryParent } from "../factories/NotificationFactory";

export async function POST(req: NextRequest) {
  try {
    await startDb();
    const payload = await req.json();
    // const NotificationFactoryImpl = new NotificationFactoryParent(
    //   myCommerceQueue
    // );
    const paymentRepo = new paymentRepository(OrderModel);
    const paymentService = new PaymentService(
      paymentRepo
      // NotificationFactoryImpl
    );

    const result = await paymentService.create(payload);
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
