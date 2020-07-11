module.exports = {
    out: "./build",
    clean: true,
    scripts: {
        "mount:public": "mount public --to /",
        "mount:src": "mount src --to /bundle",
        "run:tsc": "tsc",
        "run:tsc::watch": "$1 --watch"
    },
    installOptions: {
        rollup: {
          plugins: [require("rollup-plugin-node-polyfills")()]
        }
    }
}