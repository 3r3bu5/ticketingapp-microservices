import mongoose, { Document, Model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface for props to create a new Ticket
interface TicketAttrs {
  price: number;
  title: string;
  userId: string;
}

// An interface that describes the properties of Ticket document
export interface TicketDoc extends Document {
  price: number;
  title: string;
  userId: string;
  orderId?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

// An interface that describes Ticket model
export interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    orderId: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);
TicketSchema.set('versionKey', 'version');
TicketSchema.plugin(updateIfCurrentPlugin);
TicketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export { Ticket };
