import Vue from "vue";
import Vuex from "vuex";
import { packageModule } from "@/modules/package/store/package.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    package: packageModule,
  },
});
