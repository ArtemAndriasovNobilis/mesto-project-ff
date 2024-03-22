const cardTemplate = document.querySelector('#card-element');

export function createCardElement(item) {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
    const cardTitle = cardElement.querySelector('.element__title');
    const cardImage = cardElement.querySelector('.element__image');
    const cardDelete = cardElement.querySelector('.element__delete');
    const cardLike = cardElement.querySelector('.element__like');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    // лайк и удаление карточек

    const processDelete = () => {
        cardElement.remove();
    };

    const processLike = () => {
        cardLike.classList.toggle('element__like_active');
    }

    // увеличение изображения


    cardDelete.addEventListener('click', processDelete);
    cardLike.addEventListener('click', processLike);

    cardImage.addEventListener('click', () => {
        setImage(evt);
        openPopup(popupZoomCard);
    });

    return cardElement;
};