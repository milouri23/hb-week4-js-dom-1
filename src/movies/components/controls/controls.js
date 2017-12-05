export class Controls {
  constructor (node, data, buttonHandler, resetHandler) {
    this.node = node
    this.elements = {}
    this.buttonHandler = buttonHandler
    this.resetHandler = resetHandler

    this.getReferences()
    this.buildUI(data)
    this.bindEvents()
  }

  static get templates () {
    return {
      control: (
        `<li>
          <button class="controls__button" data-category-id="{category}">{category}</button>
        </li>`
      ),
      reset: (
        `<li>
          <button class="controls__button controls__button--reset">Reset</button>
        </li>`
      )
    }
  }

  getReferences () {
    this.elements.buttonsContainer = this.node.querySelector('.controls__buttons-container')
  }

  buildUI (data) {
    const categories = data.reduce((acc, movie) => {
      if (!acc.includes(movie.category)) {
        acc.push(movie.category)
      }
      return acc
    }, [])

    const categoriesHTML = categories
    .map(category => Controls.templates.control.replace(new RegExp('{category}', 'g'), category))
    .join('').concat(Controls.templates.reset)

    this.elements.buttonsContainer.innerHTML = categoriesHTML
  }

  bindEvents () {
    this.node.addEventListener('click', (event) => {
      const clickedElement = event.target
      if (clickedElement.classList.contains('controls__button--reset')) {
        this.resetHandler()
        return null
      }
      if (clickedElement.classList.contains('controls__button')) {
        this.buttonHandler(clickedElement.dataset.categoryId)
      }
    })
  }
}
