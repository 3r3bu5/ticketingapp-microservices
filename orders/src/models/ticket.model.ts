import mongoose, { Document, Model } from 'mongoose';

// An interface for props to create a new Ticket
interface TicketAttrs {
  price: number;
  title: string;
  id: string;
}

// An interface that describes the properties of Ticket document
export interface TicketDoc extends Document {
  price: number;
  title: string;
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
      required: true,
      min: 0
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

TicketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    ...attrs
  });
};
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export { Ticket };
