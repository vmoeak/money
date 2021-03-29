const localStorageKey = "labelList";
type Tag = {
  name: string;
  id: string;
};
type labelModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string;
  save: (tags: Tag[]) => void;
};
const labelListModel: labelModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    return this.data;
  },
  create(name) {
    const tags = this.data.map((item) => item.name);
    if (tags.indexOf(name) >= 0) return "duplicated";
    const tag: Tag = {
      name,
      id: name,
    };
    this.data.push(tag);
    this.save(this.data);
    return "success";
  },
  save(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  },
};

export default labelListModel;
