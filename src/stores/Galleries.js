import {
  applySnapshot,
  getEnv,
  getParent,
  Instance,
  types,
} from 'mobx-state-tree'
import { flow } from 'mobx-state-tree'
import { GalleryModel } from './models/GalleryModel'

export const GalleriesStoreModel = types
  .model('GalleriesStore', {
    items: types.array(GalleryModel),
  })
  .actions((self) => {
    const loadGallery = flow(function* loadGallery() {
      let language = getParent(self).uiStore.language.toUpperCase()
      try {
        const items = yield getEnv(self).apiService.getGallery({ language })
        self.items = items
      } catch (error) {
        console.log(error)
      }
    })

    return { loadGallery }
  })

let galleriesStore

export const initializeGalleriesStore = (snapshot = null) => {
  const _galleriesStore = galleriesStore ?? GalleriesStoreModel.create()

  if (snapshot) {
    applySnapshot(_galleriesStore, snapshot)
  }

  if (typeof window === 'undefined') return _galleriesStore

  if (!galleriesStore) galleriesStore = _galleriesStore

  return galleriesStore
}
