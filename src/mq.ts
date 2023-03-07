import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { CONSUME_EVENT } from "./const/mq-events";

class RabbitMQ {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor() {
    this.connect();
  }

  public async connect(): Promise<void> {
    if (!this.channel) {
      this.connection = await amqp.connect({
        hostname: "bms-rabbitmq",
        port: 5672,
        username: "admin",
        password: "admin",
      });
      this.channel = await this.connection.createChannel();
      consumeMessage(this.channel);
    }
  }

  public getChannel(): Channel | null {
    return this.channel;
  }

  sendQueue(queue: string, payload: any) {
    this.channel?.assertQueue(queue);
    this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  }
}

const consumeMessage = (channel: Channel) => {
  CONSUME_EVENT.forEach((event) => {
    channel.assertQueue(event.name);
    channel.consume(event.name, (m) => {
      event.action(channel, m ? JSON.parse(m?.content.toString()) : "", m);
    });
  });
};

export const mq = new RabbitMQ();
