<template>
  <div>
    <form @submit.prevent="loadPackageListByParams">
      <div class="form-group">
        <label class="d-block h5">Package type</label>
        <div class="form-check form-check-inline">
          <input
            v-model="form.packageType"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="radioNpm"
            value="npm"
          />
          <label class="form-check-label" for="radioNpm">npm</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            v-model="form.packageType"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="radioQh"
            value="gh"
          />
          <label class="form-check-label" for="radioQh">gh</label>
        </div>
      </div>
      <div class="form-group">
        <label class="h5" for="searchName">Search</label>
        <input
          v-model.trim="form.packageName"
          class="form-control"
          id="searchName"
          placeholder="Package name"
          required
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Search</button>
      </div>
    </form>
    <div class="position-relative" v-if="packageData !== null">
      <button
        type="button"
        class="btn btn-danger close-btn"
        @click="removePackageData"
      >
        Close
      </button>
      <pre>
        {{ packageData }}
      </pre>
    </div>
    <div v-if="packageList.length && packageData === null">
      <div class="position-relative">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(packageItem, index) of packageList"
              :key="index"
              @click="openPackageModal(packageItem)"
              class="cursor-pointer"
            >
              <th scope="row">{{ index }}</th>
              <td v-text="packageItem.name" />
              <td v-text="packageItem.type" />
            </tr>
          </tbody>
        </table>
        <BaseLoader />
      </div>
      <BasePagination @update-pagination="loadPackageList" :lastPage="10" />
    </div>
    <div v-if="packageList === null && packageData === null">
      <h5 class="text-danger">Not found package list</h5>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { eventBus } from "@/main";
import PackageCardModal from "@/modules/package/components/PackageCardModal";
import BasePagination from "@/components/BasePagination";
import BaseLoader from "@/components/BaseLoader";

export default {
  components: { BaseLoader, BasePagination },
  data() {
    return {
      form: {
        packageName: "",
        packageType: "npm",
      },
    };
  },
  async mounted() {
    const queryPage = Number(this.$route.query.page);
    const pageNum = queryPage ? queryPage : 1;
    await this.loadPackageList(pageNum);
  },
  methods: {
    async loadPackageListByParams() {
      eventBus.$emit("open-loader");
      await this.$store.dispatch("package/getPackageListByParams", this.form);
      eventBus.$emit("close-loader");
    },
    removePackageData() {
      this.SET_PACKAGE_DATA(null);
      this.form.packageName = "";
      this.form.packageType = "npm";
    },
    async loadPackageList(pageNum = 1) {
      eventBus.$emit("open-loader");
      await this.$store.dispatch("package/getPackageList", { pageNum });
      eventBus.$emit("close-loader");
    },
    openPackageModal(props) {
      eventBus.$emit("open-modal", {
        props: props,
        component: PackageCardModal,
      });
    },
    ...mapMutations("package", ["SET_PACKAGE_DATA"]),
  },
  computed: {
    ...mapState("package", ["packageList", "packageData"]),
  },
};
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
