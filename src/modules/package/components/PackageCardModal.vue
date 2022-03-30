<template>
  <div class="card">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">Name: {{ modalProp.name }}</h5>
      <h5>Type: {{ modalProp.type }}</h5>
      <p class="card-text">
        hits: {{ modalProp.hits }} <br />
        bandwidth: {{ modalProp.bandwidth }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PackegeCard",
  props: {
    modalProp: {
      type: Object,
      required: true,
    },
  },
};
</script>
