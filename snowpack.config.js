module.exports = {
    out: "./build",
    clean: true,
    extends: "@snowpack/app-scripts-svelte",
    scripts: {
        "mount:public": "mount public --to /",
        "mount:src": "mount src --to /bundle",
        "run:tsc": "tsc",
        "run:tsc::watch": "$1 --watch"
    },
    installOptions: {
        plugins: ["@snowpack/plugin-svelte"],
        rollup: {
            plugins: [require("rollup-plugin-node-polyfills")()]
        }
    }
}