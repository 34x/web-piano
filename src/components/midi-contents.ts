import contents from 'public/midi/contents.json'

export function normalizeElement(elem: { filename: string, title?: string }) {
    return elem.filename.replace(/\.midi?/, '')
        .replace(/-/g, ' - ')
        .replace(/_/g, ' ');

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


