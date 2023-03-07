import { Channel } from "amqplib";


export const ADD_USER = "ORG:ADD-USER";

export const CONSUME_EVENT = [
  {
    name: "Test",
    action: (channel: Channel, payload: any, message: any) => {
      console.log(payload);
      channel.ack(message);
    },
  },
];
