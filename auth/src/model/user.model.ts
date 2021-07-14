import mongoose, {
  PassportLocalDocument,
  PassportLocalSchema,
  PassportLocalModel,
  PassportLocalOptions,
  PassportLocalErrorMessages
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { authOptions } from '../const/auth-error';

// An interface for props to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties of User document
export interface UserDoc extends PassportLocalDocument {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

// An interface that describes User model
export interface UserModel extends PassportLocalModel<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.hash;
        delete ret.salt;
        delete ret.version;
      }
    }
  }
) as PassportLocalSchema;

userSchema.set('versionKey', 'version');

userSchema.plugin(passportLocalMongoose, authOptions);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
