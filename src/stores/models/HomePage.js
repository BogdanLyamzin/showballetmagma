import {types} from "mobx-state-tree";
import {ImageModel} from "./Image";

const VideoModel = types.model('Video',{
    mediaItemUrl: types.maybeNull(types.string),
})

export const HomePageModel = types.model('HomePage',
    {
        video: types.maybeNull(types.maybe(VideoModel)),
        videoWebm: types.maybeNull(types.maybe(VideoModel)),
        mainInfo: types.maybeNull(types.string),
        additionalInfo: types.maybeNull(types.string),
        mainImages:types.maybeNull(types.array(ImageModel)),
        testimonialImages:types.maybeNull(types.array(ImageModel)),
        gallery:types.maybeNull(types.array(ImageModel)),
        poster: types.maybeNull(ImageModel)
    })
