import {types} from "mobx-state-tree";

export const TestimonialsModel = types.model('Testimonial', {
    text: types.string,
    author: types.string,
    id: types.string
})
