
const code = ".image.svelte-w2s6ff{-webkit-animation:svelte-w2s6ff-spin 4s linear infinite;-moz-animation:svelte-w2s6ff-spin 4s linear infinite;animation:svelte-w2s6ff-spin 4s linear infinite}@-moz-keyframes svelte-w2s6ff-spin{100%{-moz-transform:rotate(360deg)}}@-webkit-keyframes svelte-w2s6ff-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes svelte-w2s6ff-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}button.svelte-w2s6ff{padding:0;border:none;font:inherit;color:inherit;background-color:transparent;outline:none;cursor:pointer}img.svelte-w2s6ff{width:128px;height:128px}#greyProgress.svelte-w2s6ff{text-align:left;width:100%;background-color:#ddd}#greenBar.svelte-w2s6ff{width:0%;height:10px;background-color:#4CAF50;text-align:center;line-height:10px;color:white}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);