import Vue from "vue";
import Vuex, { Store } from "vuex";
import { clone, createId } from "@/util";
import router from "@/router";
import dayjs from "dayjs";

Vue.use(Vuex);
type myState = {
  recordList: RecordItem[];
  labelList: Tag[];
  currentTag?: Tag;
  isSuccessCreate: boolean;
};

export default new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    labelList: [] as Tag[],
    currentTag: undefined,
    isSuccessCreate: true,
  } as myState,
  mutations: {
    fetchRecordList(state) {
      state.recordList = JSON.parse(localStorage.getItem("recordList") || "[]");
    },
    saveRecordList(state) {
      localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    createRecord(state, data: RecordItem) {
      state.isSuccessCreate = true;
      if (!data.time) {
        data.time = dayjs(new Date());
      }
      try {
        state.recordList.push(clone(data));
        saveList("recordList", state.recordList);
      } catch (error) {
        state.isSuccessCreate = false;
      }
    },
    fetchLabelList(state) {
      state.labelList = JSON.parse(localStorage.getItem("labelList") || "[]");
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
      saveList("labelList", state.labelList);
    },
    removeLabel(state, id: string) {
      const index = state.labelList.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.labelList.splice(index, 1);
        saveList("labelList", state.labelList);
        alert("删除标签成功");
        router.back();
      } else {
        alert("未找到标签");
      }
    },
    updateLabel(state, payload: { name: string; id: string }) {
      const { name, id } = payload;
      const duplicatedIndex = state.labelList.findIndex(
        (item) => item.name === name
      );
      if (duplicatedIndex >= 0 && state.labelList[duplicatedIndex].id !== id) {
        alert("标签名重复");
        return;
      }
      const index = state.labelList.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.labelList[index].name = name;
        saveList("labelList", state.labelList);
        alert("编辑标签成功");
        router.back();
      } else {
        alert("未找到标签");
      }
    },
    findTag(state, id: string) {
      state.currentTag = state.labelList.find((item) => {
        return item.id === id;
      });
    },
  },
});

function saveList(key: string, labelList: Tag[] | RecordItem[]) {
  localStorage.setItem(key, JSON.stringify(labelList));
}
