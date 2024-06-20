import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ILoading, IToast } from './types'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  const getToken = computed(() => token.value || sessionStorage.getItem('token'))
  const setToken = (value: string) => {
    token.value = value
    sessionStorage.setItem('token', token.value)
  }

  return { token, getToken, setToken }
})

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref<ILoading>({ show: false })
  const getLoading = computed(() => loading.value)
  const setLoading = (show: boolean, mask: boolean = true) => {
    loading.value = {
      show,
      mask
    }
  }

  return { loading, getLoading, setLoading }
})

export const useToastStore = defineStore('toast', () => {
  const toast = ref<IToast>({ show: false, msg: '' })
  const getToast = computed(() => toast.value)
  const setToast = (value: IToast) => {
    toast.value = value
  }

  return { toast, getToast, setToast }
})
