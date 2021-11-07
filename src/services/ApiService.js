import { createApolloClient } from '../utils/gql'
import { cloneDeep } from 'lodash'
import { GET_PAGE } from './queries/GET_PAGE'
import { GET_SERVICES } from './queries/GET_SERVISES'
import { GET_TESTIMONIALS } from './queries/GET_TESTIMONIALS'
import { GET_GALLERY } from './queries/GET_GALLERY'
import { GET_NAVIGATION } from './queries/GET_NAVIGATION'
import { GET_INFO } from './queries/GET_INFO'

class ApiService {
  apiUrl
  apiClient

  constructor(url = '') {
    this.apiUrl = url
    this.apiClient = createApolloClient(this.apiUrl)
  }

  getPage = async (variables = {}) => {
    const request = this.apiClient
      .query({
        query: GET_PAGE,
        variables,
      })
      .catch((e) => console.log(e))
    const response = await request
    const content = cloneDeep(response.data.page)
    return content
  }

  getServices = async (variables = {}) => {
    const request = this.apiClient
      .query({
        query: GET_SERVICES,
        variables,
      })
      .catch((e) => console.log(e))

    const response = await request
    const services = response.data.services.nodes.map((service) => {
      const newService = cloneDeep(service)
      const { id, slug, title } = newService
      return {
        id,
        slug,
        title,
        ...newService.servicesContent,
      }
    })

    return services
  }

  getTestimonials = async (variables) => {
    const request = this.apiClient
      .query({
        query: GET_TESTIMONIALS,
        variables,
      })
      .catch((e) => console.logs(e))
    const response = await request
    const testimonials = response.data.testimonials.nodes.map((testimonial) => {
      const newTestimonial = cloneDeep(testimonial)
      newTestimonial.testimonials.id = newTestimonial.id
      return newTestimonial.testimonials
    })
    return testimonials
  }

  getGallery = async (variables) => {
    const request = this.apiClient
      .query({
        query: GET_GALLERY,
        variables,
      })
      .catch((e) => console.log(e))
    const response = await request
    const galleries = response.data.galleries.nodes.map((gallery) => {
      const newGallery = cloneDeep(gallery)
      newGallery.gallery.slug = newGallery.slug
      newGallery.gallery.title = newGallery.title
      return newGallery.gallery
    })
    return galleries
  }

  getNavigation = async (language) => {
    const request = this.apiClient
      .query({
        query: GET_NAVIGATION,
        variables: {
          location: `MAIN_MENU${
            language !== 'ua' ? `___${language.toUpperCase()}` : ''
          }`,
        },
      })
      .catch((e) => {
        if (e) throw new Error(e.message)
      })
    const response = await request
    const items = response.data.menus.nodes[0]?.menuItems.nodes
    return items
  }

  getMainInfo = async () => {
    const request = this.apiClient
      .query({
        query: GET_INFO,
      })
      .catch((e) => {
        throw new Error(e.message)
      })
    const response = await request
    return response.data.magmaSettings.mainInfo
  }
}

export default ApiService
