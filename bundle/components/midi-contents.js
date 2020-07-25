import contents2 from "/web-piano/midi/contents.json.proxy.js";
function normalizeElement(elem) {
  const index = elem.filename.indexOf(".mid");
  const temp = elem.filename.slice(0, index).replace(/-/g, " - ");
  return temp.replace(/_/g, " ");
}
function normalizeContents(list) {
  const normalizedList = list.map((e) => {
    if (e.title) {
      return e;
    }
    const normalized = {
      ...e
    };
    normalized.title = normalizeElement(normalized);
    return normalized;
  });
  return normalizedList;
}
export function getContents() {
  return normalizeContents(contents2);
}
