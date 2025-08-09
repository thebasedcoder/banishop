import amqp from 'amqplib';

// This URL connects to the RabbitMQ instance running in your Docker container
const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
let channel: amqp.Channel | null = null;

async function getRabbitMQChannel() {
  if (channel) {
    return channel;
  }

  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('✅ RabbitMQ channel created.');

    // Assert that the queue exists and is durable
    const queue = 'order_processing';
    await channel.assertQueue(queue, { durable: true });

    return channel;
  } catch (error) {
    console.error('❌ Failed to connect or create channel in RabbitMQ', error);
    throw error;
  }
}

export async function publishMessage(queue: string, message: object) {
  try {
    const channel = await getRabbitMQChannel();
    const messageString = JSON.stringify(message);

    // Send the message with the 'persistent' option to make it durable
    channel.sendToQueue(queue, Buffer.from(messageString), { persistent: true });
    console.log(`Sent persistent message to queue '${queue}': ${messageString}`);
  } catch (error) {
    console.error(`Failed to publish message to queue '${queue}'`, error);
  }
}
