import { inject, observer } from 'mobx-react'
import { initializeRootStore } from '../../src/stores'
import { getSnapshot } from 'mobx-state-tree'
import Service from '../../src/components/Service'
import Head from 'next/dist/next-server/lib/head'

const ServicePage = ({
  props: { slug },
  servicesStore,
  mainInfoStore,
  testimonialsStore,
  uiStore,
}) => {
  const newSlug =
    uiStore.language !== 'ua' ? slug + `-${uiStore.language}` : slug
  const service = servicesStore.items.find((item) => item.slug === newSlug)
  return (
    <>
      <Head>
        <title>Magma show | Services</title>
      </Head>
      <Service
        service={service}
        partners={mainInfoStore.generalInfo.partners}
        testimonialsStore={testimonialsStore}
        uiStore={uiStore}
      />
    </>
  )
}

ServicePage.getInitialProps = async ({ req, query }) => {
  const rootStore = initializeRootStore()
  if (req) {
    rootStore.uiStore.changeLanguage(req.language)
  }
  await rootStore.mainInfoStore.loadMainInfo()
  await rootStore.testimonialsStore.loadTestimonials()
  await rootStore.pageStore.loadPage('home')

  return {
    namespacesRequired: ['common'],
    props: {
      initialState: getSnapshot(rootStore),
      slug: query.slug,
    },
  }
}

export default inject(
  'servicesStore',
  'mainInfoStore',
  'testimonialsStore',
  'uiStore',
)(observer(ServicePage))
