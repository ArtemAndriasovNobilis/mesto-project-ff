// переменные 

// попап редактирования профиля

const popupEditBtnOpen = document.querySelector('.profile__edit-button');
const resultName = document.querySelector('.profile__name');
const resultJob = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.popup__form_edit');
const nameInput = document.querySelector('.popup__field_key_name');
const jobInput = document.querySelector('.popup__field_key_job');
const popupEdit = document.querySelector('.popup_profile-edit');
const popupEditBtnClose = document.querySelector('.popup__close-btn_edit');

// попап зум картинки 

const popupZoomCard = document.querySelector('.popup_zoom-card');
const popupImage = document.querySelector('.popup__image');
const popupCardInfo = document.querySelector('.popup__card-info');
const popupZoomCardClose = document.querySelector('.popup__close-btn_zoom');

// попап нового поста 

const popupNewItemOpen = document.querySelector('.profile__add-button');
const popupNewItemAdd = document.querySelector('.popup_item-add');
const popupNewItemForm = document.querySelector('.popup__form_new-item');
const popupNewItemTitle = document.querySelector('.popup__field_item_name');
const popupNewItemLink = document.querySelector('.popup__field_item_link');
const popupNewItemSubmit = document.querySelector('.popup__save-btn');
const popupNewItemSubmitDisabled = document.querySelector('popup__save-btn_disabled');
const popupNewItemFormClose = document.querySelector('.popup__close-btn_new-item');

const cardTemplate = document.querySelector('#card-element');

const cardsContainer = document.querySelector('.elements');

const popups = document.querySelectorAll('.popup');


// универсальное закрытие попапа на esc

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

// универсальное закрытие попапа на оверлей

const popupCloseOverlay = (evt) => {
  const isPopupOverlay = evt.target.classList.contains('popup');

  if (isPopupOverlay) {
    closePopup(evt.target)
  }
};

// универсальные функции открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('mousedown', popupCloseOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mousedown', popupCloseOverlay);
}

// чтобы данные в форме редактирования профиля соответствовали сохраненным данным в профиле

function setProfileFormData() {
  nameInput.value = resultName.textContent;
  jobInput.value = resultJob.textContent;
}

// сохранение данных из полей ввода 

function processProfileFormSubmit(evt) {
  evt.preventDefault();

  resultName.textContent = nameInput.value;
  resultJob.textContent = jobInput.value;

  closePopup(popupEdit);

}

// template

function createCardElement(item) {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
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

  cardImage.addEventListener('click', () => {
    setImage();
    openPopup(popupZoomCard);
  });

  function setImage() {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCardInfo.textContent = item.name;
  };

  // открытие, закрытие увеличения, лайк, удаление 

  cardDelete.addEventListener('click', processDelete);
  cardLike.addEventListener('click', processLike);

  return cardElement;

};

function addCard(item, container) {
  const card = createCardElement(item);
  container.append(card);

};

initialCards.forEach((item) => {
  addCard(item, cardsContainer);
});


// функция добавления новой карточки в массив

const processNewItemSubmit = (event) => {
  event.preventDefault();
  const title = popupNewItemTitle.value;
  const link = popupNewItemLink.value;

  const cardData = {
    name: title,
    link,
  };

  function addNewItem(cardElement, container) {
    container.prepend(cardElement);
  };

  const cardElement = createCardElement(cardData);
  addNewItem(cardElement, cardsContainer);
  closePopup(popupNewItemAdd);

  event.target.reset();
  disableButton(event.submitter, validationSettings);

}

// попап с новым постом, слушатели открытия, закрытия, сохранения

popupNewItemOpen.addEventListener('click', function () {
  openPopup(popupNewItemAdd);
});
popupNewItemFormClose.addEventListener('click', function () {
  closePopup(popupNewItemAdd);
});
popupNewItemAdd.addEventListener('submit', processNewItemSubmit);

// слушатели попапа с увеличением

popupZoomCardClose.addEventListener('click', function () {
  closePopup(popupZoomCard);
});

// попап редактирования профиля, события открытия, закрытия, сохранения изменений 

popupEditBtnOpen.addEventListener('click', function () {
  openPopup(popupEdit);
});
popupEditBtnClose.addEventListener('click', function () {
  closePopup(popupEdit);
});
popupEditBtnOpen.addEventListener('click', setProfileFormData);
formEditProfile.addEventListener('submit', processProfileFormSubmit);
