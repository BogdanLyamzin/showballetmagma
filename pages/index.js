import { getSnapshot } from 'mobx-state-tree'
import { initializeRootStore } from '../src/stores'
import { inject, observer } from 'mobx-react'
import HomePage from '../src/components/HomePage'

const pageSlug = 'home'

const Home = ({
  pageStore,
  servicesStore,
  testimonialsStore,
  mainInfoStore,
  galleriesStore,
  uiStore,
}) => {
  const { pages } = pageStore
  const services = servicesStore.items
  return (
    <HomePage
      pages={pages}
      services={services}
      testimonialsStore={testimonialsStore}
      mainInfoStore={mainInfoStore}
      galleriesStore={galleriesStore}
      uiStore={uiStore}
    />
  )
}

Home.getInitialProps = async ({ req }) => {
  const rootStore = initializeRootStore()

  if (req) {
    rootStore.uiStore.changeLanguage(req.language)
  }
  await rootStore.pageStore.loadPage(pageSlug)
  await rootStore.servicesStore.loadServices()
  await rootStore.galleriesStore.loadGallery()
  await rootStore.testimonialsStore.loadTestimonials()
  await rootStore.mainInfoStore.loadMainInfo()

  return {
    namespacesRequired: ['common'],
    props: {
      initialState: getSnapshot(rootStore),
    },
  }
}

export default inject(
  'pageStore',
  'servicesStore',
  'testimonialsStore',
  'mainInfoStore',
  'galleriesStore',
  'uiStore',
)(observer(Home))
