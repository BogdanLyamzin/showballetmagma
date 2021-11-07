import { applySnapshot, types } from 'mobx-state-tree'


export const UIStoreModel = types
  .model('UIStore', {
    language: types.enumeration('Language', ['ua', 'en', 'ru']),
    menuOpen: types.boolean,
    isVideoLoaded: types.boolean
  })
  .actions( self => {
    const changeLanguage = (language) => {
      self.language = language
    }
    const setIsVideoLoaded = (state) => {
      self.isVideoLoaded = state
    }
    const setMenuOpen = (state) => {
      self.menuOpen = state
    }
    return {
      changeLanguage,
      setMenuOpen,
      setIsVideoLoaded
    }
  })
let uiStore
export const initializeUIStore = (snapshot = null) => {

    const _uiStore =
    uiStore ??
    UIStoreModel.create({
      language: 'ua',
      menuOpen: false,
      isVideoLoaded: false
    })

  if (snapshot) {
    applySnapshot(_uiStore, snapshot)
  }

  if (typeof window === 'undefined') return _uiStore

  if (!uiStore) uiStore = _uiStore

  return uiStore
}
