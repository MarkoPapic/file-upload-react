import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: {
        file: "lib/index.js",
        format: "es"
    },
    plugins: [
        replace({ 'process.env.NODE_ENV': "production" }),
        terser(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};