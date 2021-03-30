import Vue from "vue";
import Vuex, { Store } from "vuex";
import { clone, createId } from "@/util";

Vue.use(Vuex);
type myState = {
  recordList: RecordItem[];
  labelList: Tag[];
  currentTag?: Tag;
};

export default new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    labelList: [] as Tag[],
    currentTag: undefined,
  } as myState,
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
    fetchLabelList(state) {
      return (state.labelList = JSON.parse(
        localStorage.getItem("labelList") || "[]"
      ));
    },
    createLabel(state, name: string) {
      const tags = state.labelList.map((item) => item.name);
      if (tags.indexOf(name) >= 0) return alert("标签名重复");
      const id = createId().toString();
      const tag: Tag = {
        name,
        id,
      };
      state.labelList.push(tag);
      alert("添加标签成功");
      saveLabelList(state.labelList);
      return "success";
    },
    remove(state, id: string) {
      const index = state.labelList.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.labelList.splice(index, 1);
        saveLabelList(state.labelList);
        alert("删除标签成功");
        return "success";
      }
      return "unknown label";
    },
    updateLabel(state, { name, id }) {
      const duplicatedIndex = state.labelList.findIndex(
        (item) => item.name === name
      );
      if (duplicatedIndex >= 0) return "duplicated";
      const index = state.labelList.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.labelList[index].name = name;
        saveLabelList(state.labelList);
        return "success";
      } else {
        return "unknown label";
      }
    },
    findTag(state, id: string) {
      state.currentTag = state.labelList.find((item) => {
        return item.id === id;
      });
    },
  },
});

function saveLabelList(labelList: Tag[]) {
  localStorage.setItem("labelList", JSON.stringify(labelList));
}
