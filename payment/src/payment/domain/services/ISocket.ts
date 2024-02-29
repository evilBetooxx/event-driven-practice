export interface ISocket {
    emitSocket(data: any): Promise<boolean>;
}