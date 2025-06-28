import { reactive } from 'vue'

export const streamStore = reactive({
  ws: null,
  countWs: null,

  connectStream(url) {
    if (this.ws) this.ws.close();

    this.ws = new WebSocket(url);

    this.ws.onopen = () => console.log(`Connected to stream WebSocket: ${url}`);
    this.ws.onerror = (err) => console.error('>>>>>>>>>> Stream WebSocket error:', err);
    this.ws.onclose = () => console.log('Stream WebSocket closed');
  },

  connectCount(url) {
    if (this.countWs) this.countWs.close();

    this.countWs = new WebSocket(url);

    this.countWs.onopen = () => console.log(`Connected to count WebSocket: ${url}`);
    this.countWs.onerror = (err) => console.error('>>>>>>>>>> Count WebSocket error:', err);
    this.countWs.onclose = () => console.log('Count WebSocket closed');
  },

  disconnectAll() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.countWs) {
      this.countWs.close();
      this.countWs = null;
    }
    console.log('Closed all WebSockets');
  }
});
