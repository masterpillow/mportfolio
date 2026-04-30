import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string; email: string; subject: string; message: string;
  ip: string; read: boolean; createdAt: Date;
}

const S = new Schema<IContact>(
  {
    name:    { type: String, required: true, trim: true, maxlength: 80 },
    email:   { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    ip:      { type: String, default: "unknown" },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

S.index({ read: 1, createdAt: -1 });

const Contact: Model<IContact> =
  mongoose.models.Contact ?? mongoose.model<IContact>("Contact", S);
export default Contact;
