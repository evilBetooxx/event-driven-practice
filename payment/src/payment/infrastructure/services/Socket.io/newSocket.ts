import socketClient from 'socket.io-client';
import { ISocket } from '../../../domain/services/ISocket';

export class NewSocket implements ISocket {
  private url: string;

  constructor() {
    this.url = process.env.SOCKET_URL || '';
  }

  async emitSocket(data: any): Promise<boolean> {
    try {
      const socket = socketClient(this.url);
      socket.emit('payment', data);
      socket.disconnect();
      console.log('Mensaje emitido correctamente');
      return true;
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      return false;
    }
  }
}