import {
    applySnapshot,
    getEnv,
    getParent,
    types,
} from 'mobx-state-tree'
import { flow } from 'mobx-state-tree'

export const NavigationLinkModel = types.model('NavigationLink', {
    label: types.string,
    url: types.string,
    id: types.string,
})


export const NavigationStoreModel = types
    .model('NavigationStore', {
        items: types.array(NavigationLinkModel),
    })
    .actions((self) => {
        const loadNavigation = flow(function* loadNavigation() {
            try {
                const language = getParent(self).uiStore.language
                const items = yield getEnv(self).apiService.getNavigation(language)
                self.items = items
            } catch (error) {
                if (error) throw new Error(error.message)
            }
        })

        return { loadNavigation }
    })


    let navigationStore

export const initializeNavigationStore = (snapshot = null) => {
    const _navigationStore = navigationStore ?? NavigationStoreModel.create()

    if (snapshot) {
        applySnapshot(_navigationStore, snapshot)
    }

    if (typeof window === 'undefined') return _navigationStore

    if (!navigationStore) navigationStore = _navigationStore

    return navigationStore
}
