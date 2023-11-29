class Slider {
  static #content = null //посилання на блок slider__content
  static #left = null //посилання на кнопу вліво
  static #right = null //посилання на кнопку вправо

  static #count = 1 //наша поточна картинка та її кількість, яка показується в слайдері
  static #max = null //число максимальної кількості картинок

  // метод в якому ми підключаємо всі необхідні значення
  static init = () => {
    this.#content = document.querySelector(
      '.slider__content',
    )

    this.#left = document.querySelector(
      '.slider__button--left',
    )

    this.#right = document.querySelector(
      '.slider__button--right',
    )

    this.#max = this.#content.childElementCount //скільки дитячих елементів знаходиться в контенті

    this.#left.onclick = () => this.#slide('left') //підключаємо функцію, яка буде повертати функцію slide (вказуємо напрямок)
    this.#right.onclick = () => this.#slide('right')
  }

  //метод який прокручує наші картинки
  static #slide = (side) => {
    const offsetWidth = this.#content.offsetWidth //вказує ширину доступного контенту, який буде відображатися при зміні екрану
    const scrollLeft = this.#content.scrollLeft // вказує наскільки у нас прокручена картинка
    const scrollWidth = this.#content.scrollWidth //вказує доступну ширину для прокрутки

    let scroll = 0 //змінна яка вказує на скільки пікселів потрібно прокрутити

    if (side === 'left') {
      if (this.#count === 1 || scrollLeft === 0) {
        this.#count = this.#max

        scroll = (this.#count - 1) * offsetWidth
      } else {
        this.#count -= 1

        scroll = (this.#count - 1) * offsetWidth
      }
    }

    if (side === 'right') {
      if (
        this.#count === this.#max ||
        scrollLeft === scrollWidth - offsetWidth
      ) {
        this.#count = 1
        scroll = 0
      } else {
        this.#count += 1
        scroll = (this.#count - 1) * offsetWidth
      }
    }

    this.#content.scrollTo({
      top: 0,
      left: scroll,
      behavior: 'smooth',
    })
  }
}
Slider.init()

class Header {
  static #height = null
  static #wrapper = null
  static #button = null

  static #isOpen = false

  static init() {
    this.#height = document.querySelector(
      '.header__bottom',
    ).offsetHeight

    this.#wrapper = document.querySelector(
      '.header__wrapper',
    )

    this.#button = document.querySelector('.header__button')

    this.#button.onclick = this.#toggle
  }

  static #toggle = () => {
    if (this.#isOpen) {
      this.#button.classList.replace(
        'header__button--close',
        'header__button--open',
      )
      this.#wrapper.style.height = 0
    } else {
      this.#button.classList.replace(
        'header__button--open',
        'header__button--close',
      )
      this.#wrapper.style.height = `${this.#height}px`
    }
    this.#isOpen = !this.#isOpen
  }
}

Header.init()
