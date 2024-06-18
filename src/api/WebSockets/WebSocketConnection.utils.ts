export const isConnectionClosed = (socket: WebSocket | null) => {
  if (!socket) return false;

  const isConnectionHasDeadStatus =
    socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING;

  return isConnectionHasDeadStatus;
};
