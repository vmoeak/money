import { clone } from "@/util";
const localStorageKey = "recordList";
const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(
      localStorage.getItem(localStorageKey) || "[]"
    ) as RecordItem[];
    return this.data;
  },
  save(data: RecordItem[]) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  },
  create(data: RecordItem) {
    data.time = new Date();
    this.data.push(clone(data));
    this.save(this.data);
  },
};

export default recordListModel;
