import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { validationSettings } from "./constants.js";
import FormValidator from "./FormValidator.js";

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
const popupNewItemFormClose = document.querySelector('.popup__close-btn_new-item');

const cardsContainer = document.querySelector('.elements');

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

// попап редактирования профиля, события открытия, закрытия, сохранения изменений 
popupEditBtnOpen.addEventListener("click", function () {
  openPopup(popupEdit);
  setProfileFormData();
});

popupEditBtnClose.addEventListener("click", function () {
  closePopup(popupEdit);
});

formEditProfile.addEventListener("submit", processProfileFormSubmit);

//открытие попапа добавления карточки 
popupNewItemOpen.addEventListener("click", function () {
  openPopup(popupNewItemAdd);
});

//закрытие попапа добавления карточки
popupNewItemFormClose.addEventListener("click", function () {
  closePopup(popupNewItemAdd);
});

//создание карточки 
function addCard(item) {
  const card = new Card(item, '#card-element');
  return card.addCard();
}

initialCards.forEach((item) => {
  cardsContainer.append(addCard(item));
});

//добавление нового элемента
function addNewCardForm(evt) {
  evt.preventDefault();
  cardsContainer.prepend(
    addCard({ name: popupNewItemTitle.value, link: popupNewItemLink.value })
  );
  closePopup(popupNewItemAdd);
  newItemFormValidator.disableButton();
  popupNewItemForm.reset();
}

// слушатели попапа с увеличением карточки
popupZoomCardClose.addEventListener('click', function () {
  closePopup(popupZoomCard);
});

popupNewItemForm.addEventListener('submit', addNewCardForm);

// валидация 
const editProfileForm = document.querySelector('.popup__form_edit');
const newItemForm = document.querySelector('.popup__form_new-item');

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidator.enableValidation();

const newItemFormValidator = new FormValidator(validationSettings, newItemForm);
newItemFormValidator.enableValidation();

export { openPopup, popupZoomCard, popupCardInfo, popupImage };
