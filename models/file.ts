import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  user: Schema.Types.ObjectId;
}

const fileSchema: Schema = new Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IFile>('File', fileSchema);
