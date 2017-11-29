export class Gallery {
  constructor (node, data) {
    this.index = 0
    this.node = node
    this.elements = {}

    this.setShell()
    this.setDomReferences()
    this.setDots(data)
    this.setImages(data)
    this.setEvents()
  }

  static get states () {
    return {
      imageSelected: 'gallery__image-container--selected',
      dotSelected: 'gallery__dot-button--selected'
    }
  }

  static get templates () {
    return {
      shell: (
        `<div class="gallery__controls">
          <button class="gallery__arrow gallery__arrow--left"></button>
          <button class="gallery__arrow gallery__arrow--right"></button>
          <ul class="gallery__dots-container"></ul>
        </div>
        <ul class="gallery__images-container"></ul>`
      ),
      dot: (
        `<li class="gallery__dot">
          <button class="gallery__dot-button" data-index="{index}"></button>
        </li>`
      )
    }
  }

  static toGalleryItemHTML ({url}, index) {
    const selectedClass = index === 0
      ? Gallery.states.imageSelected
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
    this.elements.dotsContainer = this.node.querySelector('.gallery__dots-container')
  }

  setDots (data) {
    const dotsHTML = Array.from(
      Array(data.length),
      (_, index) => Gallery.templates.dot.replace('{index}', index)
    ).join('')
    this.elements.dotsContainer.innerHTML = dotsHTML
    this.elements.dots = this.elements.dotsContainer.querySelectorAll('.gallery__dot-button')
    this.elements.dots[this.index].classList.add(Gallery.states.dotSelected)
  }

  setImages (data) {
    const imagesHTML = data.map(Gallery.toGalleryItemHTML.bind(this)).join('')
    this.elements.imagesContainer.innerHTML = imagesHTML
    this.elements.galleryItems = this.node.querySelectorAll('.gallery__image-container')
  }

  setEvents () {
    this.elements.rightBtn.addEventListener('click', this.goNext.bind(this))
    this.elements.leftBtn.addEventListener('click', this.goPrevious.bind(this))
    this.elements.dotsContainer.addEventListener('click', this.dotHandler.bind(this))
    this.node.addEventListener('keydown', this.keydownHandler.bind(this))
  }

  changeGalleryIndex (index) {
    if (index >= 0 && index < this.elements.galleryItems.length && index !== this.index) {
      this.elements.galleryItems[this.index].classList.remove(Gallery.states.imageSelected)
      this.elements.dots[this.index].classList.remove(Gallery.states.dotSelected)
      this.index = index
      this.elements.galleryItems[this.index].classList.add(Gallery.states.imageSelected)
      this.elements.dots[this.index].classList.add(Gallery.states.dotSelected)
      this.elements.dots[this.index].focus()
    }
  }

  goNext () {
    this.changeGalleryIndex(this.index + 1)
  }

  goPrevious () {
    this.changeGalleryIndex(this.index - 1)
  }

  dotHandler (event) {
    const clickedElement = event.target
    if (clickedElement.classList.contains('gallery__dot-button')) {
      this.changeGalleryIndex(Number(clickedElement.dataset.index))
    }
  }

  keydownHandler ({key}) {
    if (key === 'ArrowLeft') {
      this.goPrevious()
    } else if (key === 'ArrowRight') {
      this.goNext()
    }
  }
}
