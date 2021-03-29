const localStorageKey = "recordList";
const recordListModel = {
  fetch() {
    return JSON.parse(
      localStorage.getItem(localStorageKey) || "[]"
    ) as RecordItem[];
  },
  save(data: RecordItem[]) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  },
  clone(data: RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
};

export default recordListModel;
