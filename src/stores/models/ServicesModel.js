import {types} from "mobx-state-tree";
import {ImageModel} from "./Image";

export const ServicesModel = types.model('Service', {
    id: types.string,
    slug: types.string,
    title: types.string,
    mainInfo: types.maybeNull(types.string),
    additionalInfo: types.maybeNull(types.string),
    mainImages: types.maybeNull(types.array(ImageModel)),
    gallery: types.maybeNull(types.array(ImageModel)),
})
