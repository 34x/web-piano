import contents from 'public/midi/contents.json'

function normalizeElement(elem: any) {
    const index = elem.filename.indexOf('.mid');
    const temp = elem.filename.slice(0, index).replace(/-/g, ' - ');
    return temp.replace(/_/g, ' ');

}

function normalizeContents(list: any) {
    const normalizedList = list.map((e:any) => {
        if(e.title) {
            return e
        }
        const normalized = {...e};
        normalized.title = normalizeElement(normalized);

        return normalized;
    });
    return normalizedList;
}

export function getContents() {
    return normalizeContents(contents);
}


