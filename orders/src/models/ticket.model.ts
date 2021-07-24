import mongoose, { Document, Model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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
  version: number;
}

// An interface that describes Ticket model
export interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByIdAndVersion(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
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
TicketSchema.set('versionKey', 'version');
TicketSchema.plugin(updateIfCurrentPlugin);
TicketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    ...attrs
  });
};
TicketSchema.statics.findByIdAndVersion = (event: {
  id: string;
  version: number;
}) => {
  return Ticket.findOne({ _id: event.id, version: event.version - 1 });
};
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export { Ticket };
