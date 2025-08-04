import { SocketData } from './types';

let lastUpdate = 0;
const throttleDelay = 2000;
let socket: WebSocket | null = null;

export const webSocketHandler = (
  url: string,
  update: (data: SocketData) => void,
) => {
  if (socket) return socket;

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connected ✅');
  };

  socket.onmessage = (event) => {
    const now = Date.now();
    if (now - lastUpdate < throttleDelay) return;

    lastUpdate = now;
    const data = JSON.parse(event.data);
    const [asset, priceStr] = Object.entries(data)[0];
    update({ [asset]: parseFloat(priceStr as string) } as SocketData);
  };

  socket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  socket.onclose = () => {
    console.log('WebSocket Closed');
    socket?.close();
    socket = null;
  };

  return socket;
};
