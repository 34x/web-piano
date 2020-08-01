
const code = "img.svelte-r2omvd{width:128px;height:128px;cursor:pointer}#greyProgress.svelte-r2omvd{text-align:left;width:100%;background-color:#ddd}#greenBar.svelte-r2omvd{width:0%;height:10px;background-color:#4CAF50;text-align:center;line-height:10px;color:white}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);