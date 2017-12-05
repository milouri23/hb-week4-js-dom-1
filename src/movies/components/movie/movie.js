export class Movie {
  constructor ({title, category}) {
    this.title = title
    this.category = category
    this.html = (
      `<div class="movie" data-category-id="${this.category}">
        ${this.title}:${this.category}
      </div>`
    )
  }
}
