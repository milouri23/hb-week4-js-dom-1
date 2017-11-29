import { Gallery } from './gallery/gallery.js'
import data from './gallery/galleryData.js'

/* eslint-disable */
new Gallery(document.querySelector('.gallery-one'), data)
new Gallery(document.querySelector('.gallery-two'), data)
/* eslint-enable */
