import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  private readonly messages = [
    {
      id: `130`,
      text: `No problem! See you at the meeting.`,
      createdAt: `2023-11-01T02:30:00.000Z`,
      updatedAt: `2023-11-01T02:30:00.000Z`,
      user: {
        id: `243`,
        firstName: `Fred`,
        lastName: `Smith`,
      },
    },
    {
      id: `129`,
      text: `Awesome, Fred. Thanks for doing that!`,
      createdAt: `2023-11-01T02:15:00.000Z`,
      updatedAt: `2023-11-01T02:15:00.000Z`,
      user: {
        id: `532`,
        firstName: `Lucy`,
        lastName: `Jacobs`,
      },
    },
    {
      id: `128`,
      text: `Great! I've prepared the presentation. Will share the link.`,
      createdAt: `2023-11-01T02:00:00.000Z`,
      updatedAt: `2023-11-01T02:00:00.000Z`,
      user: {
        id: `243`,
        firstName: `Fred`,
        lastName: `Smith`,
      },
    },
    {
      id: `127`,
      text: `I'm in too. Just got a reminder. See you both soon!`,
      createdAt: `2023-11-01T01:45:00.000Z`,
      updatedAt: `2023-11-01T01:45:00.000Z`,
      user: {
        id: `532`,
        firstName: `Lucy`,
        lastName: `Jacobs`,
      },
    },
    {
      id: `126`,
      text: `Thanks for confirming, Fred. I'll be joining from home.`,
      createdAt: `2023-11-01T01:30:00.000Z`,
      updatedAt: `2023-11-01T01:30:00.000Z`,
      user: {
        id: `700`,
        firstName: `John`,
        lastName: `Doe`,
      },
    },
    {
      id: `125`,
      text: `Yes, John. I'll be there. Just finishing up some work.`,
      createdAt: `2023-11-01T01:15:00.000Z`,
      updatedAt: `2023-11-01T01:15:00.000Z`,
      user: {
        id: `243`,
        firstName: `Fred`,
        lastName: `Smith`,
      },
    },
    {
      id: `124`,
      text: `Hey everyone! Are we still on for the meeting at 3pm?`,
      createdAt: `2023-11-01T01:00:00.000Z`,
      updatedAt: `2023-11-01T01:00:00.000Z`,
      user: {
        id: `700`,
        firstName: `John`,
        lastName: `Doe`,
      },
    },
  ];

  createMessage(message: {
    text: string;
    user: { id: string; firstName: string; lastName: string };
  }) {
    const newMessage = {
      id: `${this.messages.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...message,
    };
    this.messages.push(newMessage);
    console.log(`new message in backend:`, newMessage.text);
    return newMessage;
  }
}
