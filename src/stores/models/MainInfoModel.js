import { types } from 'mobx-state-tree'
import { ImageModel } from './Image'

export const MainInfoModel = types.model('MainInfo', {
  facebook: types.maybeNull(types.string),
  instagram: types.maybeNull(types.string),
  ctaImage: types.maybeNull(ImageModel),
  partners: types.maybeNull(types.array(ImageModel)),
  noise: types.maybeNull(ImageModel),
})
