export class Gallery {
  constructor (node, data) {
    this.index = 0
    this.node = node
    this.elements = {}

    this.setShell()
    this.setDomReferences()
    this.setImages(data)
    this.setEvents()
  }

  static get states () {
    return {
      selected: 'gallery__image-container--selected'
    }
  }

  static get templates () {
    return {
      shell: (
        `<div class="gallery__controls">
          <button class="gallery__arrow gallery__arrow--left"></button>
          <button class="gallery__arrow gallery__arrow--right"></button>
        </div>
        <ul class="gallery__images-container"></ul>`
      )
    }
  }

  static toGalleryItemHTML ({url}, index) {
    const selectedClass = index === 0
      ? Gallery.states.selected
      : ''

    return (
      `<li class="gallery__image-container ${selectedClass}">
        <img class="gallery__image" src="${url}"/>
      </li>`
    )
  }

  setShell () {
    this.node.innerHTML = Gallery.templates.shell
  }

  setDomReferences () {
    this.elements.imagesContainer = this.node.querySelector('.gallery__images-container')
    this.elements.leftBtn = this.node.querySelector('.gallery__arrow--left')
    this.elements.rightBtn = this.node.querySelector('.gallery__arrow--right')
  }

  setImages (data) {
    const imagesHTML = data.map(Gallery.toGalleryItemHTML.bind(this)).join('')
    this.elements.imagesContainer.innerHTML = imagesHTML
    this.elements.galleryItems = this.node.querySelectorAll('.gallery__image-container')
  }

  setEvents () {
    this.elements.rightBtn.addEventListener('click', this.goNext.bind(this))
    this.elements.leftBtn.addEventListener('click', this.goPrevious.bind(this))
  }

  changeGalleryIndex (index) {
    if (index >= 0 && index < this.elements.galleryItems.length) {
      this.elements.galleryItems[this.index].classList.remove(Gallery.states.selected)
      this.index = index
      this.elements.galleryItems[this.index].classList.add(Gallery.states.selected)
    }
  }

  goNext () {
    this.changeGalleryIndex(this.index + 1)
  }

  goPrevious () {
    this.changeGalleryIndex(this.index - 1)
  }
}