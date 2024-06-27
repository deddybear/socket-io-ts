import { RedisAdapter } from '@socket.io/redis-adapter';

interface SocketCors {
    origin : string,
    methods: string[],
}

export interface SocketConfig {
    cors: SocketCors
    adapter?: (nsp : any) => RedisAdapter
}