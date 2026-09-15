import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import xqInclude from 'vite-plugin-xq-include'
import xqCpDep from 'vite-plugin-xq-cp-dep'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    plugins:[
        xqInclude(),
        xqCpDep()
    ],
    base: './',
    build: {
        outDir:"../html/",
        emptyOutDir:false,
        cssCodeSplit:true,
        rollupOptions: {
            input: {
                'xq-confirm': resolve(__dirname, 'index.html')
            }
        }
    }

})
