import typescript from 'rollup-plugin-typescript2'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { version } from './package.json'

export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'treetools', // umd 模式
            file: `dist/@${version}/index.js`,
            format: 'umd',
            sourcemap: true,
        },
        plugins: [
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                    },
                },
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.ts'],
                exclude: 'node_modules/**',
            }),
            terser(),
        ],
    },
]
