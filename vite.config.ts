import { join, sep } from 'path';
import { UserConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '.env') });
const root = join(__dirname, 'src/renderer');

const config: UserConfig = {
    root,
    port: +process.env.PORT,
    base: './',
    outDir: join(__dirname, 'dist/renderer'),
    alias: {
        '/assets/': join(__dirname, 'src/renderer/assets'),
        '/components/': join(__dirname, 'src/renderer/components'),
        '/utils/': join(__dirname, 'src/renderer/utils'),
        '/views/': join(__dirname, 'src/renderer/views'),
    },
    rollupInputOptions: {
        external: [
            'crypto',
            'assert',
            'fs',
            'util',
            'os',
            'events',
            'child_process',
            'http',
            'https',
            'path',
            'electron',
        ],
        plugins: [
            {
                name: '@rollup/plugin-cjs2esm',
                transform(code, filename) {
                    if (filename.includes(`${sep}node_modules${sep}`)) {
                        return code;
                    }

                    const cjsRegexp = /(const|let|var)[\n\s]+(\w+)[\n\s]*=[\n\s]*require\(["|'](.+)["|']\)/g;
                    const res = code.match(cjsRegexp);
                    if (res) {
                        // const Store = require('electron-store') -> import Store from 'electron-store'
                        code = code.replace(cjsRegexp, `import $2 from '$3'`);
                    }
                    return code;
                },
            },
        ],
    },
    rollupOutputOptions: {
        format: 'commonjs',
    },
};

export default config;
