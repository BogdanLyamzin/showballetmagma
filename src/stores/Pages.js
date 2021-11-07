import {
  applySnapshot,
  getEnv,
  getParent,
  types,
} from 'mobx-state-tree'
import { flow } from 'mobx-state-tree'
import { ContactsPageModel } from './models/ContactsPage'
import { HomePageModel } from './models/HomePage'
import { AboutUsPageModel } from './models/AboutUsPage'

export const PageModel = types.model('Page', {
  title: types.string,
  slug: types.string,
  id: types.string,
  contacts: types.maybe(ContactsPageModel),
  homePage: types.maybe(HomePageModel),
  aboutUsContent: types.maybe(AboutUsPageModel),
})

export const PagesStoreModel = types
  .model('PagesStore', {
    pages: types.optional(types.map(PageModel), {}),
  })
  .actions((self) => {
    const loadPage = flow(function* loadPage(slug) {
      const language = getParent(self).uiStore.language
      try {
        const page = yield getEnv(self).apiService.getPage({
          slug: language !== 'ua' ? `${slug}-${language}` : slug,
        })
        self.pages.set(`${slug}`, page)
      } catch (error) {
        if (error) throw new Error(error.message)
      }
    })
    return { loadPage }
  })


let pageStore

export const initializePagesStore = (snapshot = null) => {
  const _pageStore = pageStore ?? PagesStoreModel.create()

  if (snapshot) {
    applySnapshot(_pageStore, snapshot)
  }

  if (typeof window === 'undefined') return _pageStore

  if (!pageStore) pageStore = _pageStore

  return pageStore
}
