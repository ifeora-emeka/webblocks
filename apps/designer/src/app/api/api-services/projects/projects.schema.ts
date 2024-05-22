import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ProjectsDocument extends Document {
  name: string
  subdomain: string
}

const ProjectsSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subdomain: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      selected: false,
    },
  },
  { timestamps: true },
)

const Projects: Model<ProjectsDocument> =
  mongoose.models.Projects ||
  mongoose.model<ProjectsDocument>('Projects', ProjectsSchema)

export default Projects
