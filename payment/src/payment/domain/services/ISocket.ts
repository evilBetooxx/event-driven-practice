export interface ISocket {
    emitSocket(event: string, data: any): Promise<boolean>;
}