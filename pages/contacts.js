import { initializeRootStore } from '../src/stores'
import { getSnapshot } from 'mobx-state-tree'
import { withTranslation } from '../i18n'
import { inject, observer } from 'mobx-react'
import Contacts from '../src/components/Contacts'
import Head from 'next/dist/next-server/lib/head'

const pageSlug = 'contacts'

const ContactsPage = ({ pageStore, mainInfoStore, uiStore }) => {
  const { pages } = pageStore
  const contacts = pages.get(pageSlug)

  return (
    <>
      <Head>
        <title>Magma show | Contacts</title>
      </Head>
      <Contacts contacts={contacts.contacts} mainInfoStore={mainInfoStore} uiStore={uiStore}/>
    </>
  )
}

ContactsPage.getInitialProps = async ({ req }) => {
  const rootStore = initializeRootStore()
  if (req) {
    rootStore.uiStore.changeLanguage(req.language)
  }
  await rootStore.pageStore.loadPage(pageSlug)
  await rootStore.pageStore.loadPage('home')
  await rootStore.mainInfoStore.loadMainInfo()

  return {
    namespacesRequired: ['common'],
    props: {
      initialState: getSnapshot(rootStore),
    },
  }
}

export default withTranslation('common')(
  inject('pageStore', 'mainInfoStore', 'uiStore')(observer(ContactsPage)),
)
