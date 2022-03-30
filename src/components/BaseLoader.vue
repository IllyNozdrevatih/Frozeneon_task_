<template>
  <div
    class="d-flex h-100 w-100 base-loader"
    :class="{ 'base-loader--active': activeLoader }"
  >
    <div class="spinner-border" role="status" />
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  data() {
    return {
      activeLoader: false,
    };
  },
  created() {
    eventBus.$on("open-loader", () => {
      this.activeLoader = true;
    });
    eventBus.$on("close-loader", () => {
      this.activeLoader = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.base-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: all 0.3s ease-in-out;
  z-index: -1;
  opacity: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(30, 30, 30, 0);

  &--active {
    background-color: rgba(30, 30, 30, 0.4);
    z-index: 1;
    opacity: 1;
  }
}
</style>
