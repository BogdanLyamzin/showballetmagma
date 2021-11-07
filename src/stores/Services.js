import {
  applySnapshot,
  getEnv,
  getParent,
  Instance,
  types,
} from 'mobx-state-tree'
import { flow } from 'mobx-state-tree'
import { ServicesModel } from './models/ServicesModel'

export const ServicesStoreModel = types
  .model('ServicesStore', {
    items: types.array(ServicesModel),
  })
  .actions((self) => {
    const loadServices = flow(function* loadServices() {
      let language = getParent(self).uiStore.language.toUpperCase()
      try {
        const items = yield getEnv(self).apiService.getServices({ language })
        self.items = items
      } catch (error) {
        throw new Error(error)
      }
    })

    return { loadServices }
  })

let servicesStore

export const initializeServicesStore = (snapshot = null) => {
  const _servicesStore = servicesStore ?? ServicesStoreModel.create()

  if (snapshot) {
    applySnapshot(_servicesStore, snapshot)
  }

  if (typeof window === 'undefined') return _servicesStore

  if (!servicesStore) servicesStore = _servicesStore

  return servicesStore
}
