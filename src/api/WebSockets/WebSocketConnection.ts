import { DefaultConnectionConfig, WebSocketCloseCodes } from './WebSocketConnection.data';
import {
  ConnectParams,
  ConnectionOptions,
  DisconnectOptions,
  WebSocketHandlers,
} from './WebSocketConnection.types';
import { isConnectionClosed } from './WebSocketConnection.utils';

class WebSocketConnection {
  private options: ConnectionOptions = DefaultConnectionConfig;
  private handlers: Partial<WebSocketHandlers> = {};
  private instance: WebSocket | null = null;
  private origin: string;
  private executedReconnectAttempts: number = 0;
  private pingPongInterval: number | null = null;
  private isManuallyClosed = false;

  constructor({ origin, handlers, options }: ConnectParams) {
    this.origin = origin;
    this.handlers = { ...handlers };
    this.options = { ...this.options, ...options };
  }

  public async open(): Promise<Event> {
    if (this.instance && !isConnectionClosed(this.instance)) {
      throw new Error('Connection is already open.');
    }

    return new Promise((resolve) => {
      this.instance = new WebSocket(this.origin, this.options.protocols);
      this.instance.binaryType = this.options.binaryType;

      this.initializeSocketEvents();
      this.instance.onopen = (socketEvent) => {
        if (this.options.shouldPing) {
          this.initPingPong();
        }
        this.executedReconnectAttempts = 0;
        if (isConnectionClosed(this.instance)) {
          this.handlers.onReconnect?.();
        } else {
          this.handlers.onOpen?.(socketEvent);
        }
        resolve(socketEvent);
      };
    });
  }

  public async close(disconnectOptions?: Partial<DisconnectOptions>): Promise<void> {
    if (!this.instance) {
      throw new Error('No existing connection to close.');
    }

    return new Promise((resolve) => {
      const { closeCode, closeReason } = disconnectOptions ?? {};
      this.isManuallyClosed = true;

      if (!isConnectionClosed(this.instance)) {
        this.instance?.addEventListener('close', () => {
          resolve();
        });
        this.instance?.close(
          closeCode ?? WebSocketCloseCodes['Normal Closure'],
          closeReason ?? 'Client closed the connection.',
        );
      } else {
        resolve();
      }

      this.destroy();
    });
  }

  public async send(data: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView) {
    if (!this.instance) return;

    if (this.instance.readyState === WebSocket.OPEN) {
      this.instance.send(data);
    } else {
      await this.waitConnectionEstablishment();
      this.instance.send(data);
    }
  }

  private initializeSocketEvents() {
    if (!this.instance) return;

    this.instance.onmessage = (socketEvent) => {
      this.handlers.onMessage?.(socketEvent.data, socketEvent);
    };
    this.instance.onerror = (socketEvent) => {
      this.handlers.onError?.(socketEvent);
    };
    this.instance.onclose = (socketEvent) => {
      if (!this.isManuallyClosed && this.options.shouldReconnect) {
        if (this.pingPongInterval) {
          clearInterval(this.pingPongInterval);
        }
        this.initReconnect();
      } else {
        if (this.pingPongInterval) {
          clearInterval(this.pingPongInterval);
        }
        this.handlers.onClose?.(socketEvent);
      }
    };
  }

  private async waitConnectionEstablishment(): Promise<void> {
    return new Promise((resolve, reject) => {
      const checkInterval = window.setInterval(() => {
        if (
          !this.origin ||
          this.instance?.readyState === WebSocket.CLOSED ||
          this.instance?.readyState === WebSocket.CLOSING
        ) {
          clearInterval(checkInterval);
          reject(
            new Error(
              'You are trying to send data via non-existing connection or closed connection.',
            ),
          );
        }

        if (this.instance && this.instance.readyState === WebSocket.OPEN) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  private initPingPong() {
    this.pingPongInterval = window.setInterval(() => {
      this.send(JSON.stringify(this.options.pingCommand));
    }, this.options.pingTimeout * 1000);
  }

  private initReconnect() {
    this.executedReconnectAttempts += 1;

    if (this.executedReconnectAttempts > this.options.reconnectAttempts) {
      this.handlers.onReconnectFail?.();
      this.destroy();
      return;
    }

    window.setTimeout(() => {
      this.open();
    }, this.options.reconnectTimeout * 1000);
  }

  private destroy() {
    this.options = {} as ConnectionOptions;
    this.handlers = {} as Partial<WebSocketHandlers>;
    this.origin = '';
    this.instance = null;
    this.executedReconnectAttempts = 0;
    this.isManuallyClosed = false;
  }
}

export default WebSocketConnection;
