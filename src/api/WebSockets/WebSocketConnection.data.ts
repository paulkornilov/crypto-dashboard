import { ConnectionOptions } from './WebSocketConnection.types';

export enum WebSocketCloseCodes {
  'Normal Closure' = 1000,
  'Going Away' = 1001,
  'Protocol Error' = 1002,
  'Unsupported Data' = 1003,
  'Reserved' = 1004,
  'No Status Received' = 1005,
  'Abnormal Closure' = 1006,
  'Invalid frame payload data' = 1007,
  'Policy Violation' = 1008,
  'Message Too Big' = 1009,
  'Mandatory Ext.' = 1010,
  'Internal Error' = 1011,
  'Service restart' = 1012,
  'Try again later' = 1013,
  'Bad Gateway' = 1014,
  'TLS handshake' = 1015,
}

export const enum DefaultOptionValues {
  PING_TIMEOUT = 300, // Seconds
  RECONNECT_TIMEOUT = 0.2, // Seconds
  RECONNECT_ATTEMPTS = 3,
}

export const DefaultPingCommand = {
  type: 'ping',
};

export const DefaultConnectionConfig: ConnectionOptions = {
  shouldPing: false,
  pingCommand: DefaultPingCommand,
  pingTimeout: DefaultOptionValues.PING_TIMEOUT,
  shouldReconnect: false,
  reconnectAttempts: DefaultOptionValues.RECONNECT_ATTEMPTS,
  reconnectTimeout: DefaultOptionValues.RECONNECT_TIMEOUT,
  protocols: [] as string[],
  binaryType: 'blob',
} as const;
