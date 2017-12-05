export class Grid {
  constructor (node, movies) {
    this.node = node
    this.html = movies.map(movie => movie.html).join('')
    this.fillNode()
  }

  static get states () {
    return {
      hidden: 'grid__item--hidden',
      invisible: 'grid__item--invisible'
    }
  }

  fillNode () {
    this.node.innerHTML = this.html
    this.children = Array.from(this.node.children)
  }

  filterByCategoryId (categoryId) {
    console.log('filterByCategoryId:', categoryId)
    this.resetFilter()
    this.children.forEach((child) => {
      if (child.dataset.categoryId !== categoryId) {
        child.classList.add(Grid.states.hidden)
      }
    })
  }

  resetFilter () {
    this.children.forEach((child) => {
      child.classList.remove(Grid.states.hidden)
    })
  }
}
