<template>
  <div
    class="base-modal-wrap"
    :class="{ 'base-modal-wrap--active': modalActive }"
    @click.self="closeModal"
  >
    <div class="base-modal">
      <component
        v-if="modalComponent !== null"
        :is="modalComponent"
        :modalProp="modalProps"
      />
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  data() {
    return {
      modalActive: false,
      modalComponent: null,
      modalProps: null,
    };
  },
  created: function () {
    eventBus.$on("open-modal", (data) => {
      this.modalProps = data.props;
      this.modalComponent = data.component;
      this.modalActive = true;
    });
  },
  methods: {
    closeModal() {
      this.modalActive = false;
      this.modalComponent = null;
      this.modalProps = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.base-modal-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: all 0.3s ease-in-out;
  z-index: -1;
  opacity: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(30, 30, 30, 0);

  .base-modal { 
    width: 600px;
    height: 400px;
    border-radius: 10px;

    @media (max-width: 700px) {
      width: 400px;
    }

    @media (max-width: 500px) {
      width: 300px;
    }
  }

  &--active {
    background-color: rgba(30, 30, 30, 0.4);
    z-index: 99;
    opacity: 1;
  }
}
</style>
