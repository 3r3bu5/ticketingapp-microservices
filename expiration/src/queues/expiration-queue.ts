import Queue from 'bull';
import { expirationCompletePub } from '../events/publishers/expirationCompletePub';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST
  }
});

expirationQueue.process(async (job) => {
  new expirationCompletePub(natsWrapper.client).publish({
    orderId: job.data.orderId
  });
});

export { expirationQueue };
