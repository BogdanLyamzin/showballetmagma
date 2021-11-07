import { types } from 'mobx-state-tree'
import { ImageModel } from './Image'

const EventModel = types.model('Event', {
  logo: types.maybeNull(ImageModel),
  maininfo: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
})

export const AboutUsPageModel = types.model('AboutUsPage', {
  title: types.maybeNull(types.string),
  subTitle: types.maybeNull(types.string),
  mainInfo: types.maybeNull(types.string),
  additionalInfo: types.maybeNull(types.string),
  topImage: types.maybeNull(ImageModel),
  midImage: types.maybeNull(ImageModel),
  mainDescription: types.maybeNull(types.string),
  mainConclusion: types.maybeNull(types.string),
  conclusion: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  conclusionImage: types.maybeNull(ImageModel),
  mainConclusionImage: types.maybeNull(ImageModel),
  slevent: types.maybeNull(EventModel),
  riyadhevent: types.maybeNull(EventModel),
  eventsimages: types.maybeNull(types.array(ImageModel)),
  formUrl: types.maybeNull(types.string),
})
