
const code = "h2.svelte-1hvvzet{width:50%}.browsers-links.svelte-1hvvzet{list-style:none;margin:0px;padding:0px}.browsers-links__item.svelte-1hvvzet{text-align:center;padding:0.8em;border-bottom:1px solid lightgray}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);