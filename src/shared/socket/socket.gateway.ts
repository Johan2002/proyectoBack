import { Logger } from '@nestjs/common';
import { OnGatewayInit } from './../../../node_modules/@nestjs/websockets/interfaces/hooks/on-gateway-init.interface.d';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class DataGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketGateway');

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('WebSocket Gateway Initialized');
  }

  emitData(data: any) {
    this.logger.log(data);
    this.server.emit('dataUpdate', data);
  }
}
