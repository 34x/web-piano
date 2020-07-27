import App from "src/app.svelte";
import { getContents, normalizeElement } from './midi-contents';

test("check getContents", () => {
    expect(getContents()).toBeTruthy();
});

test("check normalizeElement", () => {
    expect(normalizeElement({ filename: '' })).toBe('');
    expect(normalizeElement({ filename: 'foo' })).toBe('foo');
    expect(normalizeElement({ filename: 'Artist_Name-Title_Name' })).toBe('Artist Name - Title Name');
    expect(normalizeElement({ filename: 'Dire_straits-Private_investigations.mid' })).toBe('Dire straits - Private investigations');
});