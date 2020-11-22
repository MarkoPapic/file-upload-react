import babel from "@rollup/plugin-babel";
import closureCompiler from "@ampproject/rollup-plugin-closure-compiler";

export default {
    input: "src/index.js",
    output: {
        file: "lib/index.js",
        format: "es"
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        closureCompiler({
            compilation_level: "ADVANCED_OPTIMIZATIONS"
        })
    ]
};