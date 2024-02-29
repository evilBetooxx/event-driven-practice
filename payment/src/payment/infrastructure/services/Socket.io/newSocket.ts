import socketClient from 'socket.io-client';
import { ISocket } from '../../../domain/services/ISocket';

export class NewSocket implements ISocket {
  private url: string;

  constructor() {
    this.url = process.env.SOCKET_URL || '';
  }

  async emitSocket(event: string, data: any): Promise<boolean> {
    try {
      const socket = socketClient(this.url);
      socket.emit("payment");
      console.log('Mensaje emitido correctamente', event);
      return true;
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      return false;
    }
  }
}