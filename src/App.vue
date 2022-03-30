<template>
  <div id="app">
    <div class="container py-3">
      <router-view />
    </div>
    <BaseModal />
    <div class="default-footer py-3">
      <div class="container">
        <div class="row">
          <div class="col-auto">
            Github:
            <a href="https://github.com/IllyNozdrevatih" target="_blank"
              >IllyNozdrevatih</a
            >
          </div>
          <div class="col-auto">
            Email:
            <a href="mailto: noz220399@gmail.com">noz220399@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-flow: column;
}

.default-footer {
  margin-top: auto;
}
</style>
<script>
import BaseModal from "@/components/BaseModal";
export default {
  components: { BaseModal },
};
</script>
