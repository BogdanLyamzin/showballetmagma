import { initializeRootStore } from '../src/stores'
import { getSnapshot } from 'mobx-state-tree'
import { withTranslation } from '../i18n'
import { inject, observer } from 'mobx-react'
import AboutUs from '../src/components/AboutUs'
import Head from 'next/dist/next-server/lib/head'

const pageSlug = 'about-us'
const homePageSlug = 'home'

const AboutUsPage = ({ pageStore, servicesStore, mainInfoStore, uiStore }) => {
  const { pages } = pageStore
  const content = pages.get(pageSlug)
  const serviceImages = pages.get(homePageSlug).homePage

  return (
    <>
      <Head>
        <title>Magma show | About us</title>
      </Head>

      <AboutUs
        content={content.aboutUsContent}
        servicesStore={servicesStore}
        mainInfoStore={mainInfoStore}
        serviceImages={serviceImages}
        uiStore={uiStore}
      />
    </>
  )
}

AboutUsPage.getInitialProps = async ({ req }) => {
  const rootStore = initializeRootStore()
  if (req) {
    rootStore.uiStore.changeLanguage(req.language)
  }
  await rootStore.mainInfoStore.loadMainInfo()
  await rootStore.pageStore.loadPage(homePageSlug)
  await rootStore.pageStore.loadPage(pageSlug)
  await rootStore.servicesStore.loadServices()
  await rootStore.mainInfoStore.loadMainInfo()

  return {
    namespacesRequired: ['common'],
    props: {
      initialState: getSnapshot(rootStore),
    },
  }
}

export default withTranslation('common')(
  inject(
    'pageStore',
    'servicesStore',
    'mainInfoStore',
    'uiStore',
  )(observer(AboutUsPage)),
)
