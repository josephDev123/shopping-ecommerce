import { generateUniquePaymentID } from "@/app/utils/randomCharacters";
import axios from "axios";
import { NextResponse } from "next/server";
import { paymentRepository } from "../repository/paymentRepository";
import { PaymentService } from "../service/PaymentService";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const paymentService = new PaymentService();
    const paymentController = new paymentRepository(paymentService);
    const result = await paymentController.create(payload);
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
