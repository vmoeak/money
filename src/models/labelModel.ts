import { createId } from "@/util";
const localStorageKey = "labelList";
type Tag = {
  name: string;
  id: string;
};
type labelModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string;
  update: (name: string, id: string) => string;
  remove: (id: string) => string;
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
    const id = createId().toString();
    const tag: Tag = {
      name,
      id,
    };
    this.data.push(tag);
    this.save(this.data);
    return "success";
  },
  update(name, id) {
    const duplicatedIndex = this.data.findIndex((item) => item.name === name);
    if (duplicatedIndex >= 0) return "duplicated";
    const index = this.data.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.data[index].name = name;
      this.save(this.data);
      return "success";
    } else {
      return "unknown label";
    }
  },
  remove(id: string) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.data.splice(index, 1);
      this.save(this.data);
      return "success";
    }
    return "unknown label";
  },
  save(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  },
};
export default labelListModel;
