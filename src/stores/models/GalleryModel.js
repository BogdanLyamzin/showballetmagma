import {types} from "mobx-state-tree";
import {ImageModel} from "./Image";

export const GalleryModel = types.model('Gallery', {
    slug: types.string,
    title: types.string,
    mainInfo: types.maybeNull(types.string),
    additionalInfo: types.maybeNull(types.string),
    gallery: types.maybeNull(types.array(ImageModel)),
})
