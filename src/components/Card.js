export default class Card {
    constructor(cardInfo, templateSelector, handleCardClick) {
        this._templateSelector = templateSelector;
        this._name = cardInfo.name;
        this._link = cardInfo.link;
        this.handleCardClick = handleCardClick;
    }

    //создание template 
    _getTemplate() {
        const template = document.querySelector(this._templateSelector)
            .content.querySelector(".element")
            .cloneNode(true);
        return template;
    }

    //добавление данных
    _addInfo() {
        const elementTitle = this._newCard.querySelector(".element__title");
        elementTitle.textContent = this._name;
        this._elementImage = this._newCard.querySelector(".element__image");
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
    };

    //удаление элемента
    _deleteElement() {
        this._newCard.remove();
        this._newCard = null;
    }

    //лайк
    _likeClick() {
        this._likeButton.classList.toggle("element__like_active");
    }

    //Слушатели - удаление, лайк, открытие
    _setEventListeners() {
        const deleteButton = this._newCard.querySelector(".element__delete");
        deleteButton.addEventListener("click", this._deleteElement.bind(this));
        this._likeButton = this._newCard.querySelector(".element__like");
        this._likeButton.addEventListener("click", () => {
            this._likeClick();
        });
        this._elementImage.addEventListener("click", () => {
            this.handleCardClick({ name: this._name, link: this._link });
        });
    }

    //создание нового поста
    addCard() {
        this._newCard = this._getTemplate();
        this._addInfo();
        this._setEventListeners();
        return this._newCard;
    }
}
