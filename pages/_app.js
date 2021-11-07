import { useEffect } from 'react'
import { i18n, appWithTranslation } from '../i18n'
import App from 'next/app'
import { useStores } from '../src/stores'
import { Provider } from 'mobx-react'
import '../src/styles/styles.scss'
import CTA from '../src/components/CTA'
import Head from 'next/dist/next-server/lib/head'
import Contacts from './contacts'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../src/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const MagmaApp = ({ Component, pageProps }) => {
  const stores = useStores(pageProps.props.initialState)
  const language = stores.uiStore.language

  useEffect(() => {
    stores.uiStore.language !== i18n.language &&
      stores.uiStore.changeLanguage(i18n.language)
    stores.mainInfoStore.loadMainInfo()
    stores.servicesStore.loadServices()
    stores.testimonialsStore.loadTestimonials()
    stores.galleriesStore.loadGallery()
    stores.navigationStore.loadNavigation()
    stores.pageStore.loadPage('home')
  }, [language])

  return (
    <Provider {...stores}>
      <>
        <Head>
          <title>Magma show</title>
          <meta
            name="description"
            content="SHOW BALLET MAGMA IS AN EXCEPTIONAL, EXTRAVAGANT AND STRIKING
                  CONCEPT FOR YOUR EVENT FOCUSED ON CREATING ONE-AND-ONLY
                  ENTERTAINMENT AND ATMOSPHERE."
          />
        </Head>
        <Component {...pageProps} />
        {Component !== Contacts && <CTA />}
        {Component !== Contacts && <Footer />}
      </>
    </Provider>
  )
}

MagmaApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MagmaApp)
