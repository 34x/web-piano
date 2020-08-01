
const code = "ul.svelte-1fhnq7g{list-style:none;margin:0px;padding:0px}li.svelte-1fhnq7g{text-align:left;padding:0.8em;border-bottom:1px solid lightgray;display:flex;justify-content:space-between}span.svelte-1fhnq7g{cursor:pointer}img.svelte-1fhnq7g{width:20px;height:20px;cursor:pointer}.selected.svelte-1fhnq7g{background-color:rgba(200, 200, 200, 1)}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);