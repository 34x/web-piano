import contents2 from "/web-piano/midi/contents.json.proxy.js";
export function normalizeElement(elem) {
  return elem.filename.replace(/\.midi?/, "").replace(/-/g, " - ").replace(/_/g, " ");
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
