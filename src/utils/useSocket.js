import { ref, computed, onUnmounted } from "vue";
import { io } from "socket.io-client";
import { getLocalStorageToken } from "@/utils/auth";
const host = import.meta.env.VITE_BASE_API;
const token = getLocalStorageToken();

const notificationCount = ref(0);

const socket = io(host, {
  path: "/socket.io/connect",
  transports: ["websocket"],
  autoConnect: true, //启动自从自动连接
  secure: true,
  transports: ["websocket"], // ['websocket', 'polling']
  reconnection: true, //启动重新连接
  reconnectionAttempts: 5, //最大重试连接次数
  reconnectionDelay: 2000, //最初尝试新的重新连接等待时间
  reconnectionDelayMax: 10000,
  query: {
    Authorization: `Bearer ${token}`,
  },
});

socket.on("connect", () => socket.on("syncNotification", () => count()));

const count = () => (notificationCount.value += 1);
