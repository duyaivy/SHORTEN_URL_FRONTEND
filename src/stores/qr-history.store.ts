import { ExtraQrHistory } from '@/models/interface/url.interface'
import { create } from 'zustand'

interface ManageHistoryScan {
  // State
  extraHistory: ExtraQrHistory[]
  isDeleting: boolean

  // Actions - Pure state updates only
  setExtraHistory: (histories: ExtraQrHistory[]) => void
  setIsDeleting: (isDeleting: boolean) => void

  handleCheck: (_id: string) => void
  handleCheckAll: () => void

  // Get computed values
  getCheckedIds: () => string[]
  getCheckedCount: () => number
  isAllChecked: () => boolean
}

const initialState = {
  extraHistory: [] as ExtraQrHistory[],
  isDeleting: false
}

export const useManageHistoryScan = create<ManageHistoryScan>((set, get) => ({
  ...initialState,

  // Setters
  setExtraHistory: (histories) => set({ extraHistory: histories }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),

  // Toggle check single item
  handleCheck: (_id) => {
    set((state) => ({
      extraHistory: state.extraHistory.map((item) => (item._id === _id ? { ...item, isCheck: !item.isCheck } : item))
    }))
  },

  // Toggle check all items
  handleCheckAll: () => {
    set((state) => {
      const isAllChecked = state.extraHistory.length > 0 && state.extraHistory.every((item) => item.isCheck)
      return {
        extraHistory: state.extraHistory.map((item) => ({ ...item, isCheck: !isAllChecked }))
      }
    })
  },

  // Computed getters
  getCheckedIds: () => {
    return get()
      .extraHistory.filter((item) => item.isCheck)
      .map((item) => item._id as string)
  },

  getCheckedCount: () => {
    return get().extraHistory.filter((item) => item.isCheck).length
  },

  isAllChecked: () => {
    const items = get().extraHistory
    return items.length > 0 && items.every((item) => item.isCheck)
  }
}))
