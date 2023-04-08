<template>
  <div class="card">
    <div v-if="modalProp !== null" class="card-body d-flex flex-column package-card-scrollbar">
      <h5 class="card-title">Name: {{ modalProp.name }}</h5>
      <h5>Type: {{ modalProp.type }}</h5>
      <p class="card-text">
      </p>
      <pre>{{getPackageDetailInfo(modalProp)}}</pre>
    </div>  
    <div v-else class="card-body d-flex align-items-center justify-content-center h-100 ">
      <h5 class="card-title mb-0">Sorry, We don't have any detail information</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "PackegeCard",
  props: {
    modalProp: {
      type: Object,
      required: true
    },
  },
  methods: {
    getPackageDetailInfo(packege) {
      const packegeDetailInfo = Object.assign({}, packege)
      
      delete packegeDetailInfo.name
      delete packegeDetailInfo.type
      
      return packegeDetailInfo
    }
  }
};
</script>

<style lang="scss" scoped>
.package-card-scrollbar {
  overflow: auto;
  width: 600px;
  height: 400px;

  @media (max-width: 700px) {
    width: 400px;
  }

  @media (max-width: 500px) {
    width: 300px;
  }
}
</style>