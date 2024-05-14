import { defineStore } from 'pinia'

export const useReloadStore = defineStore({
  id: 'reload',
  state: () => ({
    reload: false
  }),
  actions: {
    openReload(value:boolean) {
      this.reload = value
    }
  }
})