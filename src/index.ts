const code = navigator.appCodeName;
import App from "./app.svelte";
import Browser from "./browser.svelte";

function browserCheck () {
    if(code == 'Mozilla' || code == 'Chrome') {
        const app = new App({
            target: document.body,
        });

    }
    else {
        const browser = new Browser({
            target:document.body
        })
    }
}

browserCheck();




