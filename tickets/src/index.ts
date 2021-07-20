import { connectDB } from '../src/config/db.config';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { randomBytes } from 'crypto';

const main = async () => {
  try {
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID  must be defined');
    }

    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID  must be defined');
    }

    if (!process.env.NATS_URI) {
      throw new Error('NATS_URI must be defined');
    }

    if (!process.env.JWT_KEY) {
      throw new Error('JWT key must be defined');
    }

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URI
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS Disconnected!');
      process.exit();
    });
    process.on('SIGTERM', () => natsWrapper.client.close());
    process.on('SIGINT', () => natsWrapper.client.close());

    connectDB();

    app.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  } catch (err) {
    console.error(err);
  }
};

main();
