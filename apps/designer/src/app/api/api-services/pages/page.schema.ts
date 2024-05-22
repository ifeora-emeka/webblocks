import mongoose, { Schema, Document, Model } from 'mongoose'

export interface PagesDocument extends Document {
  name: string
  route: string
  project: string
}

const PagesSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Projects',
      required: true,
    },
  },
  { timestamps: true },
)

const Pages: Model<PagesDocument> =
  mongoose.models.Pages || mongoose.model<PagesDocument>('Pages', PagesSchema)

export default Pages
