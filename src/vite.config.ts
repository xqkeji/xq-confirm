import { defineConfig } from 'vite'
import { resolve} from 'path'
import xqInclude from 'vite-plugin-xq-include'
import xqCpDep from 'vite-plugin-xq-cp-dep'
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
