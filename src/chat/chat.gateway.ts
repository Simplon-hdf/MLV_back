import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';
import { JwtService } from '@nestjs/jwt';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
interface User {
  username: string;
  token: string;
  socketId: string;
}

class Room {
  constructor(public roomId: string, public users: User[] = []) {}
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements
    OnModuleInit,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  private rooms: Room[] = [];

  constructor(
    private messageService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
    this.removeUserFromRooms(client);
    this.sendConnectedUsers();
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected');
  }

  @SubscribeMessage('createRoom')
  async createRoom(
    @MessageBody() { token, roomName }: { token: string; roomName: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('createRoom', token, roomName);
    const info: any = await this.jwtService.decode(token);
    console.log('createRoom', info);

    const user: User = {
      username: info.email,
      token: token,
      socketId: client.id,
    };

    const room = new Room(roomName);
    room.users.push(user);
    this.rooms.push(room);
    this.sendRooms();
  }

  @SubscribeMessage('onConnection')
  async onConnection(
    @MessageBody()
    {
      token,
      roomId,
      username,
    }: { token: string; roomId: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('onConnection', token, roomId, username);
    const info: any = await this.jwtService.decode(token);
    console.log('onConnection', info);

    const user = {
      username: info.nom,
      token: token,
      id: info.id,
      socketId: client.id,
    };

    this.addUserToRoom(user, roomId);
    client.join(roomId);

    this.sendConnectedUsers(roomId);
  }

  @SubscribeMessage('getRooms')
  getRooms(@ConnectedSocket() client: Socket) {
    this.sendRooms();
  }

  onModuleInit() {
    console.log('Init');
  }

  private addUserToRoom(user: User, roomId: string) {
    let room = this.rooms.find((room) => room.roomId === roomId);

    if (!room) {
      room = new Room(roomId);
      this.rooms.push(room);
    } else {
      const existingUser = room.users.find((u) => u.socketId === user.socketId);

      if (existingUser) {
        return;
      }
    }

    room.users.push(user);
  }

  private removeUserFromRooms(client: Socket) {
    for (const room of this.rooms) {
      const index = room.users.findIndex((user) => user.socketId === client.id);

      if (index !== -1) {
        room.users.splice(index, 1);
      }
    }
  }

  private getUsersInRoom(roomId: string): User[] {
    const room = this.rooms.find((room) => room.roomId === roomId);
    console.log('room', room);
    return room ? room.users : [];
  }

  private sendConnectedUsers(roomId?: string) {
    if (roomId) {
      this.server
        .to(roomId)
        .emit('connectedUsers', this.getUsersInRoom(roomId));
    } else {
      this.server.emit('connectedUsers', this.getUsersInRoom(roomId));
    }
  }

  private getRoomId(client: Socket): string | null {
    for (const room of this.rooms) {
      if (room.users.find((u) => u.socketId === client.id)) {
        return room.roomId;
      }
    }
    return null;
  }

  @SubscribeMessage('switchRoom')
  async switchRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() newRoomId: string,
  ) {
    const user = this.getUserBySocketId(client.id);
    //close old room

    if (user) {
      const currentRoom = this.getRoomByUserId(user.socketId);
      const newRoom = this.rooms.find((room) => room.roomId === newRoomId);

      if (currentRoom && newRoom && currentRoom !== newRoom) {
        currentRoom.users = currentRoom.users.filter(
          (u) => u.socketId !== user.socketId,
        );
        newRoom.users.push(user);

        client.leave(currentRoom.roomId);
        client.join(newRoom.roomId);

        this.sendConnectedUsers(currentRoom.roomId);
        this.sendConnectedUsers(newRoom.roomId);

        await this.onConnection(
          { token: user.token, roomId: newRoomId, username: user.username },
          client,
        );
      }
    }
  }

  private sendRooms() {
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() body, @ConnectedSocket() client: Socket) {
    const roomId = body.roomId;
    const message = body.message;
    console.log('sendMessage', body);
    const user = this.getUserBySocketId(client.id);
    const room = this.rooms.find((room) => room.roomId === roomId);
    const sender: any = await this.jwtService.decode(message.token);
    if (room && user) {
      this.server.to(roomId).emit('message', {
        msg: 'New message',
        content: message.content,
        senderName: sender.prenom + ' ' + sender.nom,
        token: message.token,
      });
    }

    const usersInRoom = this.getUsersInRoom(roomId);

    for (const user of usersInRoom) {
      if (user.socketId !== client.id) {
        console.log('user', user);
        const receiver: any = await this.jwtService.decode(user.token);
        console.log('receiver', receiver);
        //create messageDto
        const message: CreateMessageDto = {
          roomId: roomId,
          content: body.message.content,
          receiverName: receiver.prenom + ' ' + receiver.nom,
          senderId: sender.id,
          senderName: sender.prenom + ' ' + sender.nom,
          receiverId: receiver.id,
        };
        await this.messageService.create(message);
      }
    }
  }

  private getUserBySocketId(socketId: string): User | null {
    for (const room of this.rooms) {
      const user = room.users.find((u) => u.socketId === socketId);

      if (user) {
        return user;
      }
    }
    return null;
  }

  private getRoomByUserId(socketId: string): Room | null {
    for (const room of this.rooms) {
      const user = room.users.find((u) => u.socketId === socketId);

      if (user) {
        return room;
      }
    }
    return null;
  }

  private getUsernameFromToken(token: string): string | null {
    try {
      const decodedToken = this.jwtService.verify(token);
      return decodedToken.username || null;
    } catch (error) {
      // En cas d'erreur lors de la vérification du token
      return null;
    }
  }

  @SubscribeMessage('clearRooms')
  clearRooms() {
    this.rooms = [];
    this.sendRooms();
  }
  afterInit(server: any): any {
    console.log('Init');
  }
}
