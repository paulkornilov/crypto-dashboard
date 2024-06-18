import { WebSocketCloseCodes } from './WebSocketConnection.data';

export type ConnectParams = {
  /**
   * URL for connection via WebSocket.
   */
  origin: string;
  /**
   * Object with event handlers for current connection.
   */
  handlers?: Partial<WebSocketHandlers>;
  /**
   * Additional options that affect WebSocket connection flow.
   */
  options?: Partial<ConnectionOptions>;
};

export type ConnectionOptions = {
  /**
   * Forces connection to use ping-pong technic.
   * This allows to keep connection opened.
   * (By default this value is set to false).
   */
  shouldPing: boolean;
  /**
   * Time in seconds between sending ping command via connection.
   * (By default it is set to 300 or 5 mins)
   */
  pingTimeout: number;
  /**
   * Any object that can be stringified via JSON.stringify() method.
   * (By default it is set to {type: "ping"})
   */
  pingCommand: unknown;
  /**
   * Forces connection to try to reconnect to origin if connection is closed.
   * (By default it is set to false)
   */
  shouldReconnect: boolean;
  /**
   * Amount of reconnect attempts.
   * This won't work if shouldReconnect flag is set to false.
   * (By default it is set to 2)
   */
  reconnectAttempts: number;
  /**
   * Time in seconds between reconnect attempts.
   * (By default this value is set to 0.2s)
   */
  reconnectTimeout: number;
  /**
   * Array of string values for WebSocket protocols definition.
   * (By default it is set to [])
   */
  protocols: string[];
  /**
   * Controls the type of binary data being received over the WebSocket connection.
   * (By default it is set to 'blob')
   */
  binaryType: 'blob' | 'arraybuffer';
};

export type DisconnectOptions = {
  /**
   * Use WebSocketCloseCodes const for setting close code.
   */
  closeCode: WebSocketCloseCodes;
  /**
   * Short string with description.
   * (this will be available only on backend in onClose event)
   */
  closeReason: string;
};

export type WebSocketHandlers = {
  /**
   * onOpen callback fires when connection is established.
   */
  onOpen: (socketEvent: Event) => void;
  /**
   * onMessage callback fires when connection receives any incoming message from origin.
   */
  onMessage: (responseData: unknown, socketEvent: MessageEvent) => void;
  /**
   * onError callback fires when connection faces any error (network, incorrect closure, etc).
   */
  onError: (errorEvent: Event) => void;
  /**
   * onClose callback fires when connection is closed.
   * (This can happen in different cases such as errors, manual closure, etc)
   */
  onClose: (closeEvent: CloseEvent) => void;
  /**
   * onReconnect callback fires when connection is finally reconnected after some attempts.
   */
  onReconnect: () => void;
  /**
   * onReconnectFail callback fires when connection is not reconnected after some attempts.
   */
  onReconnectFail: () => void;
};
