import { Module } from '@nestjs/common';
import { DataGateway } from './socket.gateway';

@Module({
  providers: [DataGateway],
})
export class SocketModule {}
