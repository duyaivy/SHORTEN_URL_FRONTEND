import { ExtraURL, URL } from '@/models/interface/url.interface'
import { create } from 'zustand'

interface ManageUrlStore {
  // State
  extraUrl: ExtraURL[]
  isDeleting: boolean
  isLoading: boolean
  isUpdating: boolean
  isChangingStatus: boolean

  // Actions - Pure state updates only
  setExtraUrl: (urls: ExtraURL[]) => void
  setIsDeleting: (isDeleting: boolean) => void
  setIsUpdating: (isUpdating: boolean) => void
  setIsChangingStatus: (isChangingStatus: boolean) => void

  handleCheck: (_id: string) => void
  handleCheckAll: () => void

  // Get computed values
  getCheckedIds: () => string[]
  getCheckedCount: () => number
  isAllChecked: () => boolean
  getTotalViews: () => number

  // Optimistic updates (call after mutation success)
  updateUrlStatus: (_id: string, is_active: boolean) => void
  updateUrl: (_id: string, updatedData: Partial<URL>) => void
}

const initialState = {
  extraUrl: [] as ExtraURL[],
  isDeleting: false,
  isLoading: false,
  isUpdating: false,
  isChangingStatus: false
}

export const useManageUrlStore = create<ManageUrlStore>((set, get) => ({
  ...initialState,

  // Setters
  setExtraUrl: (urls) => set({ extraUrl: urls }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
  setIsUpdating: (isUpdating) => set({ isUpdating }),
  setIsChangingStatus: (isChangingStatus) => set({ isChangingStatus }),

  // Toggle check single item
  handleCheck: (_id) => {
    set((state) => ({
      extraUrl: state.extraUrl.map((item) => (item._id === _id ? { ...item, isCheck: !item.isCheck } : item))
    }))
  },

  // Toggle check all items
  handleCheckAll: () => {
    set((state) => {
      const isAllChecked = state.extraUrl.length > 0 && state.extraUrl.every((url) => url.isCheck)
      return {
        extraUrl: state.extraUrl.map((item) => ({ ...item, isCheck: !isAllChecked }))
      }
    })
  },

  // Computed getters
  getCheckedIds: () => {
    return get()
      .extraUrl.filter((url) => url.isCheck)
      .map((url) => url._id as string)
  },

  getCheckedCount: () => {
    return get().extraUrl.filter((url) => url.isCheck).length
  },

  isAllChecked: () => {
    const urls = get().extraUrl
    return urls.length > 0 && urls.every((url) => url.isCheck)
  },

  getTotalViews: () => {
    return get().extraUrl.reduce((count, url) => count + Number(url.views || 0), 0)
  },

  updateUrlStatus: (_id, is_active) => {
    set((state) => ({
      extraUrl: state.extraUrl.map((url) => (url._id === _id ? { ...url, is_active } : url))
    }))
  },

  updateUrl: (_id, updatedData) => {
    set((state) => ({
      extraUrl: state.extraUrl.map((item) => (item._id === _id ? { ...item, ...updatedData } : item))
    }))
  }
}))
