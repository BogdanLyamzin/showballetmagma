import {
  applySnapshot,
  getEnv,
  getParent,
  Instance,
  types,
} from 'mobx-state-tree'
import { flow } from 'mobx-state-tree'
import { TestimonialsModel } from './models/TestimonialsModel'

export const TestimonialsStoreModel = types
  .model('TestimonialsStore', {
    items: types.array(TestimonialsModel),
  })
  .actions((self) => {
    const loadTestimonials = flow(function* loadTestimonials() {
      let language = getParent(self).uiStore.language.toUpperCase()

      try {
        const items = yield getEnv(self).apiService.getTestimonials({
          language,
        })
        self.items = items
      } catch (error) {
        console.log(error)
      }
    })

    return { loadTestimonials }
  })

let testimonialsStore

export const initializeTestimonialsStore = (snapshot = null) => {
  const _testimonialsStore =
    testimonialsStore ?? TestimonialsStoreModel.create()

  if (snapshot) {
    applySnapshot(_testimonialsStore, snapshot)
  }

  if (typeof window === 'undefined') return _testimonialsStore

  if (!testimonialsStore) testimonialsStore = _testimonialsStore

  return testimonialsStore
}
