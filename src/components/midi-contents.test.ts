import App from "src/app.svelte";
import { getContents } from './midi-contents';
test("check getContents function", () => {
    expect(getContents()).toBeTruthy();
});