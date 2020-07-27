module.exports = {
    baseUrl: "/web-piano/",
    out: "./build",
    clean: true,
    extends: "@snowpack/app-scripts-svelte",
    scripts: {
        "mount:public": "mount public --to /",
        "mount:src": "mount src --to /bundle",
        "run:tsc": "tsc --noEmit",
        "run:tsc::watch": "$1 --watch"
    },
    installOptions: {
        installTypes: true,
        rollup: {
            plugins: [require("rollup-plugin-node-polyfills")()]
        }
    },
    plugins: [

    ],
    devOptions: {
        bundle: false
    }
}