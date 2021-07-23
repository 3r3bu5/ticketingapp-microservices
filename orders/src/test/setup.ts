import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signup(): string[];
    }
  }
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = 'nottheactualkey';
  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = () => {
  // build jwt payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'email@gmail.com'
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
};
