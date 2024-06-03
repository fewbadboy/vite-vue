import { onMounted, onUnmounted } from "vue";

export function useResize(callback) {
  onMounted(() => {
    window.addEventListener("resize", callback);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", callback);
  });
}
