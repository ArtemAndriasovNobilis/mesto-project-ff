import '../pages/index.css';
import { initialCards } from "./cards.js";
import { closePopup, openPopup, } from "./modal.js";
import { createCardElement, processDelete, processLike } from "./card.js";

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
const popupNewItemFormClose = document.querySelector('.popup__close-btn_new-item');

const cardsContainer = document.querySelector('.elements');



// чтобы данные в форме редактирования профиля соответствовали сохраненным данным в профиле

function setForm() {
  nameInput.value = resultName.textContent;
  jobInput.value = resultJob.textContent;
}

function addCard(item, container) {
  const card = createCardElement(item, processDelete, processLike, setImage);
  container.append(card);

};

// сохранение данных из полей ввода 

function processFormSubmit(evt) {
  evt.preventDefault();

  resultName.textContent = nameInput.value;
  resultJob.textContent = jobInput.value;

  closePopup(popupEdit);

};

function setImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCardInfo.textContent = evt.target.alt;
  openPopup(popupZoomCard);
};


initialCards.forEach((item) => {
  addCard(item, cardsContainer, setImage);
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

  const cardElement = createCardElement(cardData, processDelete, processLike, setImage);
  addNewItem(cardElement, cardsContainer);
  closePopup(popupNewItemAdd);

  event.target.reset();

};


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
  setForm()
}); 
popupEditBtnClose.addEventListener('click', function () {
  closePopup(popupEdit);
});
formEditProfile.addEventListener('submit', processFormSubmit);