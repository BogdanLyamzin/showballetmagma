import { applySnapshot, types } from 'mobx-state-tree'
import ApiService from '../services/ApiService'
import { initializeServicesStore, ServicesStoreModel } from './Services'
import { useMemo } from 'react'
import { initializeUIStore, UIStoreModel } from './UI'
import {
  initializeTestimonialsStore,
  TestimonialsStoreModel,
} from './Testimonials'
import { GalleriesStoreModel, initializeGalleriesStore } from './Galleries'
import { initializePagesStore, PagesStoreModel } from './Pages'
import { initializeNavigationStore, NavigationStoreModel } from './Navigation'
import { initializeMainInfoStore, MainInfoStore } from './MainInfo'

export const RootStoreModel = types.model('RootStore', {
  uiStore: types.maybe(UIStoreModel),
  servicesStore: types.maybe(ServicesStoreModel),
  testimonialsStore: types.maybe(TestimonialsStoreModel),
  galleriesStore: types.maybe(GalleriesStoreModel),
  pageStore: types.maybe(PagesStoreModel),
  navigationStore: types.maybe(NavigationStoreModel),
  mainInfoStore: types.maybe(MainInfoStore),
})

let rootStore
const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/wp/graphql'
export const initializeRootStore = (snapshot = null) => {
  const servicesStore = initializeServicesStore(snapshot?.servicesStore)
  const uiStore = initializeUIStore(snapshot?.uiStore)
  const testimonialsStore = initializeTestimonialsStore(
    snapshot?.testimonialsStore,
  )
  const galleriesStore = initializeGalleriesStore(snapshot?.galleriesStore)
  const pageStore = initializePagesStore(snapshot?.pageStore)
  const navigationStore = initializeNavigationStore(snapshot?.pageStore)
  const mainInfoStore = initializeMainInfoStore(snapshot?.mainInfoStore)

  const _rootStore =
    rootStore ??
    RootStoreModel.create(
      {
        uiStore,
        servicesStore,
        testimonialsStore,
        galleriesStore,
        pageStore,
        navigationStore,
        mainInfoStore,
      },
      {
        apiService: new ApiService(apiUrl),
      },
    )
  if (snapshot) {
    applySnapshot(_rootStore, snapshot)
  }

  if (typeof window === 'undefined') return _rootStore

  if (!rootStore) rootStore = _rootStore

  return rootStore
}

export const useStores = (initialState) => {
  return useMemo(() => initializeRootStore(initialState), [initialState])
}
