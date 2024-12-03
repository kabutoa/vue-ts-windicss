import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, mergeConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import windicss from 'vite-plugin-windicss'
import compression from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

import { name } from './package.json' with { type: 'json' }

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
    },
    preview: {
      port: 8888,
      host: '0.0.0.0'
    }
  } as UserConfig

  if (!isProd) {
    return mergeConfig(baseConfig, {
      base: env.VITE_BASE_URL,
      server: {
        port: 8080,
        host: '0.0.0.0',
        proxy: {
          [`${env.VITE_API_URL}`]: {
            target: env.VITE_MOCK_PATH,
            changeOrigin: true
          }
        }
      }
    } as UserConfig)
  }

  return mergeConfig(baseConfig, {
    base: `${env.VITE_CDN_PATH}${name}`,
    plugins: [legacy(), compression(), visualizer({ open: true })],
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // 手动分包
          manualChunks: {
            'vue-vendor': ['vue', 'pinia', 'vue-router']
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
      },
      // 构建优化
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除 console
          drop_debugger: true // 生产环境去除 debugger
        }
      }
    }
  } as UserConfig)
})
