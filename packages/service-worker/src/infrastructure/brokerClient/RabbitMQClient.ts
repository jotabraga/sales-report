import amqp, { Connection, Channel } from "amqplib";
import { BrokerClient } from "../../ports/brokerClient/BrokerClient";

export class RabbitMQClient implements BrokerClient {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
    }
  }

  async publish(topic: string, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQClient is not connected. Call connect() first.");
    }

    await this.channel.assertQueue(topic); // Assegura que a fila existe
    this.channel.sendToQueue(topic, Buffer.from(JSON.stringify(message)), {
      persistent: true, // Garante que a mensagem será salva no disco caso o broker caia
    });
  }

  async subscribe(
    topic: string,
    handler: (message: any) => Promise<void>
  ): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQClient is not connected. Call connect() first.");
    }

    await this.channel.assertQueue(topic); // Assegura que a fila existe

    this.channel.consume(topic, async (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        try {
          await handler(content); // Processa a mensagem
          this.channel!.ack(msg); // Confirma o processamento da mensagem
        } catch (err) {
          console.error("Failed to process message:", err);
          this.channel!.nack(msg); // Rejeita a mensagem para reprocessamento
        }
      }
    });
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      this.channel = null;
    }
  }
}