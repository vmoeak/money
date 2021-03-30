let id = parseInt(localStorage.getItem("_idMax") || "0") || 0;

function createId() {
  id++;
  localStorage.setItem("_idMax", id.toString());
  return id;
}

function clone(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export { createId, clone };
