import { orderCreatedListener } from './events/listeners/orderCreatedListener';
import { natsWrapper } from './nats-wrapper';

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

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URI
    );
    new orderCreatedListener(natsWrapper.client).listen();
    natsWrapper.client.on('close', () => {
      console.log('NATS Disconnected!');
      process.exit();
    });
    process.on('SIGTERM', () => natsWrapper.client.close());
    process.on('SIGINT', () => natsWrapper.client.close());
  } catch (err) {
    console.error(err);
  }
};

main();
