import { inject, observer } from 'mobx-react'
import { initializeRootStore } from '../../src/stores'
import { getSnapshot } from 'mobx-state-tree'
import Gallery from '../../src/components/Gallery'
import Head from "next/dist/next-server/lib/head";

const GalleryPage = ({ galleriesStore, uiStore, props: { slug } }) => {
  const newSlug =
    uiStore.language !== 'ua' ? slug + `-${uiStore.language}` : slug
  const currentItem = galleriesStore.items.find((item) => item.slug === newSlug)

  return <>
    <Head>
      <title>
        Magma show | Gallery
      </title>
    </Head>
    <Gallery galleriesStore={galleriesStore} currentItem={currentItem} newSlug={newSlug} uiStore={uiStore}/>
    </>
}

GalleryPage.getInitialProps = async ({ req, query }) => {
  const rootStore = initializeRootStore()
  if (req) {
    rootStore.uiStore.changeLanguage(req.language)
  }
  await rootStore.mainInfoStore.loadMainInfo()
  await rootStore.pageStore.loadPage('home')
  await rootStore.galleriesStore.loadGallery()

  return {
    namespacesRequired: ['common'],
    props: {
      initialState: getSnapshot(rootStore),
      slug: query.slug,
    },
  }
}

export default inject('galleriesStore', 'uiStore')(observer(GalleryPage))
