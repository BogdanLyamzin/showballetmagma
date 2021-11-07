import { types } from 'mobx-state-tree'
const ImageDetails = types.model('ImageDetails', {
  width: types.maybeNull(types.number),
  height: types.maybeNull(types.number),

})
export const ImageModel = types.model('Image', {
  id: types.string,
  mimeType: types.string,
  mediaItemUrl: types.string,
  altText: types.string,
  caption: types.maybeNull(types.string),
  mediaDetails: types.maybeNull(ImageDetails),
})
