Finally, we're going to set up real-time messaging with WebSockets. This is where the magic happens!

We'll set up both the WebSocket client and server.

Here's how the flow will work:

1. The NextJS app will connect to the WebSocket server on the NestJS backend
2. The WebSocket server will authenticate the user based on the cookie
3. The WebSocket server will listen for messages from the client
4. The WebSocket server will broadcast the message to all connected clients

Starting with the server, install the following packages in the NestJS app:

```bash
pnpm add @nestjs/websockets @nestjs/platform-socket.io socket.io cookie
pnpm add -D @types/cookie
```

Next, we can use the NestJS CLI to generate a new module with some WebSocket boilerplate out the box:

```bash
npx nest generate resource modules/message
Choose WebSockets from the CLI
```

This will generate a new module with a gateway, service, and module file.

Let's first update the `MessageService` to handle the logic for creating new messages that are sent to the WebSocket server:

```ts
import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class MessageService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createMessageDto: CreateMessageDto) {
    return await this.databaseService.message.create({
      data: createMessageDto,
      include: {
        user: true,
      },
    });
  }
}
```

Okay nice!

Next, let's update the `MessageGateway` to handle the WebSocket connection. We're going to leverage the `handleConnection()` method that is called when a new client connects to the WebSocket server. We'll check and validate the respective access token (like we've done in previous lessons):

```ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from "@nestjs/websockets";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Server, Socket } from "socket.io";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth/auth.guard";
import * as cookie from "cookie";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const cookies = client.handshake.headers.cookie;
    if (!cookies) {
      client.emit("auth_error", "No cookies provided");
      client.disconnect();
      return;
    }

    const parsedCookies = cookie.parse(cookies);
    const accessToken = parsedCookies["accessToken"];

    if (!accessToken) {
      client.emit("auth_error", "No access token provided");
      client.disconnect();
      return;
    }
    try {
      await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      client.emit("auth_error", "Invalid access token");
      client.disconnect();
    }
  }
}
```

It's worth noting a few things from this code:

- We're using the `@WebSocketGateway` decorator to define the WebSocket server. The cors object has credentials set to true to allow cookies to be sent with the WebSocket connection
- We're using the `@WebSocketServer()` decorator to define the WebSocket server instance
- We're using the `handleConnection()` method to authenticate the user based on the access token in the cookie. If the user is not authenticated, we emit an `auth_error` event and disconnect the client. This should be handled appropiately by the frontend (for example, logging the user out, or showing them a modal that they need to sign in again)

Finally, let's update the WebSocket server to handle a `createMessage` event from the client.

Here's what we'll do:

1. First validate the incoming message
2. Create the message in the database
3. Broadcast the message to all connected clients

```ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from "@nestjs/websockets";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Server, Socket } from "socket.io";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth/auth.guard";
import * as cookie from "cookie";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    // ...
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage("createMessage")
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    this.server.emit("newMessage", message);
  }
}
```

Here's the respective `CreateMessageDto` which leverages the generated Prisma types:

```ts
import { Message } from "@prisma/client";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto
  implements Pick<Message, "content" | "channelId" | "userId">
{
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  channelId: number;

  @IsInt()
  userId: number;
}
```

Importantly, the `this.server.emit` method broadcasts the message to all connected clients. This is how real-time messaging is achieved with WebSockets!

So, with regards to the WebSocket client, I opted for a custom hook called `useSocket` to handle the connection and event listeners. Here's the code:

```ts
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import io, { Socket } from "socket.io-client";
import { addMessage } from "../store/messages";
import { Message } from "@backend/types";

export const useSocket = () => {
  const [socket, setSocket] = useState<null | Socket>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      return;
    }
    // Connect to WebSocket server
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_API || ``, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server!");
    });

    newSocket.on("newMessage", (message: Message) => {
      dispatch(addMessage(message));
    });

    return () => {
      newSocket.close();
    };
  }, [dispatch]);

  return { socket };
};
```

Each time the WebSocket server emits the `newMessage` event, the `addMessage` action is dispatched to update the Redux store with the new message.

With respect to sending messages to the WebSocket server, see my example implementation here:

```ts
// ...
import { useSocket } from "../hooks/useSocket";

export const Chat = ({ channelId }: { channelId: number }) => {
  const { socket } = useSocket();
  const [newMessage, setNewMessage] = useState<string>(``);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage || !user) {
      throw new Error(`Unable to send message`);
    }
    socket?.emit(`createMessage`, {
      content: newMessage,
      channelId,
      userId: user.id,
    });
    setNewMessage(``);
  };
  return (
    <main className="col-span-3 bg-white">
      {channel && (
        <div className="flex h-screen flex-col">
          // ...
          <div className="sticky bottom-0 w-full border-t p-8">
            <form
              action=""
              method="post"
              className="flex"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                name="message"
                id="message"
                className="w-full rounded-lg border p-2"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                autoFocus
              />
              <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
```

When the form is submitted, the `createMessage` event is emitted to the WebSocket server with the respective message content, channel ID, and user ID.

So importantly, the WebSocket server will handle the message creation and broadcast the message to all connected clients (including the client that sent the message).

And that's it! You've now set up real-time messaging with WebSockets in your NextJS and NestJS applications. 🚀
