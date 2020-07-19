
const code = ".player-container.svelte-dp4d2d{width:80em}.piece-info.svelte-dp4d2d{margin:0.4em;height:2em}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);