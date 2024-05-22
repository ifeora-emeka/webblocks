import mongoose, { Schema, Document, Model } from 'mongoose';
import htmlTags from 'html-tags';

type ElementType = (typeof htmlTags)[number];

export interface ElementsDocument extends Document {
  name: string;
  slug: string;
  type: ElementType;
  element_id: string;
  page: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
}

// const validateCSSProperties = (value: any): boolean => {
//   if (typeof value !== 'object' || value === null) return false;
//   for (const property in value) {
//     if (!(property in CSSProperties)) {
//       return false;
//     }
//   }
//   return true;
// };

const ElementsSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: htmlTags,
    },
    element_id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    page: {
      type: Schema.Types.ObjectId,
      ref: 'Pages',
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Projects',
      required: true,
    },
    style: {
      type: Map,
      of: String,
      // validate: {
      //   validator: validateCSSProperties,
      //   message: 'Invalid CSS properties',
      // },
    },
    tailwind_style: {
      type: Map,
      of: String,
      // validate: {
      //   validator: validateCSSProperties,
      //   message: 'Invalid CSS properties',
      // },
    },
    children_tailwind_style: {
      type: Map,
      of: String,
      // validate: {
      //   validator: validateCSSProperties,
      //   message: 'Invalid CSS properties',
      // },
    },
  },
  { timestamps: true }
);

const Elements: Model<ElementsDocument> =
  mongoose.models.Elements ||
  mongoose.model<ElementsDocument>('Elements', ElementsSchema);

export default Elements;
