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
          <button class="controls__button" data-category-id="{categoryId}">{categoryId}</button>
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
    const categories = data.reduce((acc, {categoryId}) => {
      if (!acc.includes(categoryId)) {
        acc.push(categoryId)
      }
      return acc
    }, [])

    const categoriesHTML = categories
    .map(categoryId => Controls.templates.control
      .replace(new RegExp('{categoryId}', 'g'), categoryId)
    )
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
