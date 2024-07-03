import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import windicss from 'vite-plugin-windicss'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

import { name } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProd = mode === 'production'

  const baseConfig = {
    plugins: [vue(), vueJsx(), windicss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
  if (!isProd) {
    return mergeConfig(baseConfig, {
      base: env.VITE_BASE_URL,
      server: {
        proxy: {
          [`${env.VITE_API_URL}`]: {
            target: env.VITE_MOCK_PATH,
            changeOrigin: true
          }
        }
      }
    })
  }
  return mergeConfig(baseConfig, {
    base: `${env.VITE_CDN_PATH}${name}`,
    plugins: [
      legacy(),
      compression({
        ext: '.gz', // 生成的文件后缀
        algorithm: 'gzip', // 使用 gzip 压缩算法
        deleteOriginFile: false // 是否删除原始文件
      }),
      visualizer({ open: true })
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          // 手动分包
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router']
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: ({ name }: { name?: string }) => {
            if (name && /\.(css)$/.test(name)) {
              return 'css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          }
        }
      }
    }
  })
})
