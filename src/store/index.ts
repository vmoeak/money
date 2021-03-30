import Vue from "vue";
import Vuex, { Store } from "vuex";
import { clone } from "@/util";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
  },
  mutations: {
    fetchRecordList(state) {
      return (state.recordList = JSON.parse(
        localStorage.getItem("recordList") || "[]"
      ) as RecordItem[]);
    },
    saveRecordList(state) {
      localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    createRecord(state, data: RecordItem) {
      data.time = new Date();
      state.recordList.push(clone(data));
    },
  },
});
