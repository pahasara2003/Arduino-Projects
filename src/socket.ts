import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://server-149742673453.asia-south1.run.app/";

export const socket = io(URL, {
  autoConnect: false,
});
