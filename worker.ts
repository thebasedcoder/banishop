import amqp from 'amqplib';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
const QUEUE_NAME = 'order_processing';

// A mock email sending function
async function sendEmail(to: string, subject: string, body: string) {
  console.log(`--- Sending Email ---`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
  console.log(`---------------------`);
}

async function startWorker() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.prefetch(1); // Only process one message at a time

    console.log(`[*] Worker is waiting for messages in queue: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg) {
        const content = msg.content.toString();
        console.log(`[x] Received message: ${content}`);

        try {
          const messageData = JSON.parse(content);

          // === YOUR BACKGROUND LOGIC GOES HERE ===
          if (messageData.task === 'send_confirmation_email') {
            const user = await prisma.user.findUnique({ where: { clerkId: messageData.clerkId } });
            if (user) {
              await sendEmail(user.email, `Order Confirmation #${messageData.orderId}`, "Thank you for your order!");
            }
          }
          // =======================================

          // Acknowledge that the message was processed successfully
          channel.ack(msg);
          console.log(`[✓] Message processed and acknowledged.`);
        } catch (error) {
          console.error('Error processing message:', error);
          // Tell RabbitMQ the message failed and should be requeued
          channel.nack(msg, false, true);
        }
      }
    }, { noAck: false }); // Ensure manual acknowledgement is on

  } catch (error) {
    console.error('Failed to start RabbitMQ worker:', error);
    process.exit(1);
  }
}

startWorker();