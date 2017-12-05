export class Movie {
  constructor ({title, categoryId}) {
    this.title = title
    this.categoryId = categoryId
    this.html = (
      `<div class="movie grid__item" data-category-id="${this.categoryId}">
        ${this.title}
      </div>`
    )
  }
}
