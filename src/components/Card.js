const cardTemplate = document.querySelector('#card-element');

// создание карточки

export function createCardElement(item, processDelete, processLike, setImage) {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);

    const cardTitle = cardElement.querySelector('.element__title');
    cardTitle.textContent = item.name;

    const cardImage = cardElement.querySelector('.element__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;

    const cardDelete = cardElement.querySelector('.element__delete');
    cardDelete.addEventListener('click', () => {
        processDelete(cardDelete.closest('.card'))
});

cardImage.addEventListener('click', setImage);

const cardLike = cardElement.querySelector('.element__like');
cardLike.addEventListener('click', processLike)

return cardElement;


};

// удаление карточки

export function processDelete(element) {
    element.remove()
};

// лайк карточки

export function processLike(element) {
    element.target.classList.toggle('element__like_active')
};






