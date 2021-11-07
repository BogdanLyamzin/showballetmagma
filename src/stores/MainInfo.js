import { applySnapshot, getEnv, types } from 'mobx-state-tree'
import { flow } from 'mobx-state-tree'
import { MainInfoModel } from './models/MainInfoModel'

export const MainInfoStore = types
  .model('MainInfoStore', {
    generalInfo: types.maybeNull(MainInfoModel),
  })
  .actions((self) => {
    const loadMainInfo = flow(function* loadMainInfo() {
      try {
        const info = yield getEnv(self).apiService.getMainInfo()
         self.generalInfo = info
      } catch (error) {
        console.log(error)
      }
    })

    return { loadMainInfo }
  })

let mainInfoStore

export const initializeMainInfoStore = (snapshot = null) => {
  const _mainInfoStore = mainInfoStore ?? MainInfoStore.create()

  if (snapshot) {
    applySnapshot(_mainInfoStore, snapshot)
  }

  if (typeof window === 'undefined') return _mainInfoStore

  if (!mainInfoStore) mainInfoStore = _mainInfoStore

  return mainInfoStore
}
