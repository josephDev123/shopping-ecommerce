import { UserInterface } from "@/models/User";
import mongoose, { Schema } from "mongoose";

export async function startDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("db successful");
  } catch (error) {
    console.log("dbs: " + error);
  }
}

// class dbContext {
//   constructor(private readonly db: Schema<UserInterface>) {}

//   async connect() {
//     try {
//       await mongoose.connect(process.env.MONGODB_URL as string);
//       console.log("db successful");
//     } catch (error) {
//       console.log("dbs: " + error);
//     }
//   }
// }
