import { Schema, Types, model } from "mongoose";

type ILocation = {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
};

interface Tracking {
  shippingId: Types.ObjectId;
  location: ILocation;
}

const TrackingSchema = new Schema<Tracking>({
  shippingId: { type: Schema.Types.ObjectId, ref: "Shipping", required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
});

// Create 2dsphere index for geo queries
TrackingSchema.index({ location: "2dsphere" });

export default model<Tracking>("Tracking", TrackingSchema);
