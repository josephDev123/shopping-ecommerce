import { model, models, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (v: string) {
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      //   },
      //   message: "Invalid email address",
      // },
    },
    subject: { type: String, required: true },
    message: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

const ContactModel =
  models.Contact || model<IContact>("Contact", ContactSchema);
export default ContactModel;
