import App from "./app.svelte";
import Browser from "./browser.svelte";
import { isBrowserSupported } from 'src/components/browser';

const ActualApp = isBrowserSupported(navigator) ? App : Browser;

const app = new ActualApp({
    target: document.body,
})



