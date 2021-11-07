import { types } from 'mobx-state-tree'
import { ImageModel } from './Image'

export const ContactsPageModel = types.model('ContactsPage', {
  title: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  phone1: types.maybeNull(types.string),
  phone2: types.maybeNull(types.string),
  ownerPhoto: types.maybeNull(ImageModel),
  creativePhoto: types.maybeNull(ImageModel),
})
