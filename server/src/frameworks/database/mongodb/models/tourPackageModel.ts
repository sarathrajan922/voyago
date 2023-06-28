import { Schema, model, models } from "mongoose";

const packageSchema = new Schema({
  agentId: {
    type: String,
    required: [true, "please specify agentId"],
  },
  packageName: {
    type: String,
    required: [true, "please add  package name"],
  },
  description: {
    type: String,
    required: [true, "please add  description"],
  },
  price: {
    type: Number,
    required: [true, "please add  price"],
  },

  locations: {
    type: Array,
    required: [true, "please add some location"],
  },
  category: {
    type: String,
    required: [true, "please add  category"],
  },
  isDisabled: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array,
    required: [true, "please upload some images"],
  },
  duration: {
    type: Number,
    required: [true, "please specify a duraction"]
  },
  services: {
    type: Array,
    required: [true, "please add some services"]
  }
});

const TourPackage = model("TourPackage", packageSchema, "tourPackages");
export default TourPackage
