import { $http } from "@/plugins/http";

export const packageModule = {
  namespaced: true,
  state: {
    packageList: [],
    packageData: null,
  },
  mutations: {
    SET_PACKAGE_LIST(state, payload) {
      state.packageList = payload;
    },
    SET_PACKAGE_DATA(state, payload) {
      state.packageData = payload;
    },
  },
  actions: {
    async getPackageList({ commit }, { pageNum = 1, limit = 10 }) {
      try {
        const { data } = await $http.get(
          `/stats/packages?page=${pageNum}&limit=${limit}`
        );
        commit("SET_PACKAGE_LIST", data);
      } catch (e) {
        commit("SET_PACKAGE_LIST", null);
        console.log(e);
      }
    },
    async getPackageListByParams({ commit }, { packageType, packageName }) {
      try {
        const { data } = await $http.get(
          `/package/${packageType}/${packageName}`
        );
        commit("SET_PACKAGE_DATA", data);
      } catch (e) {
        commit("SET_PACKAGE_DATA", "Not found");
        console.log(e);
      }
    },
  },
};
