let lastUpdate = 0;
const throttleDelay = 1000;
let socket: WebSocket | null = null;

export const webSocketHandler = (url: string, update: (data: any) => void) => {
  if (socket) return socket;

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connected ✅');
  };

  socket.onmessage = (event) => {
    const now = Date.now();
    if (now - lastUpdate < throttleDelay) return;
    const data = JSON.parse(event.data);
    lastUpdate = now;
    const { p, s } = data.data;
    update({ [s]: parseFloat(p as string) });
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
