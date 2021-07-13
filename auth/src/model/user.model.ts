import { Model, Schema, model, Document } from 'mongoose';

// interface to build a user document 
interface userAttrs {
  email: string,
  password: string
}
// interface to build a user document 
interface userDOC extends Document {
  email: string,
  password: string,
  createdAt: string,
  updatedAt: string
}

// interface to build a user document 
interface UserModel extends Model<userDOC> {
    build(attrs: userAttrs): userDOC;
}

//schema itself
const schema = new Schema<userDOC, UserModel>(
    { email: {type: String, required: true},
      password: {type: String, required: true}
    } 
);
// add static function to schema
schema.static('build', function build(attrs: userAttrs) {
    return new User(attrs)
});

// generics 
const User = model<userDOC, UserModel>('User', schema);

export {User}