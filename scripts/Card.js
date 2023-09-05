import {
    openPopup,
    popupZoomCard,
    popupCardInfo,
    popupImage
} from "./index.js";

export class Card {
    constructor(cardInfo, templateSelector) {
        this._templateSelector = templateSelector;
        this._name = cardInfo.name;
        this._link = cardInfo.link;
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

    //открытие карточки 
    _openImage() {
        openPopup(popupZoomCard);
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCardInfo.textContent = this._name;
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
            this._openImage();
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
