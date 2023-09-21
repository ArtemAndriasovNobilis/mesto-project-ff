import './index.css';
import Card from "../components/Card.js";
import { initialCards } from "../components/initial-cards.js";
import { validationSettings } from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// переменные 
// попап редактирования профиля
const popupEditBtnOpen = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__field_key_name');
const jobInput = document.querySelector('.popup__field_key_job');
const popupEdit = document.querySelector('.popup_profile-edit');
const nameSelector = document.querySelector('.profile__name');
const descriptionSelector = document.querySelector('.profile__description')

// попап зум картинки 
const popupImage = document.querySelector('.popup_zoom-card');


// попап нового поста 
const popupNewItemOpen = document.querySelector('.profile__add-button');
const popupNewItemAdd = document.querySelector('.popup_item-add');

//Добавление карточки
const popupAddNewItem = new PopupWithForm({
  popup: popupNewItemAdd,
  submitHandler: (formItem) => {
    cardContainer.addItem(generateCard(formItem));
    popupAddNewItem.close();
  },
});

popupNewItemOpen.addEventListener('click', () => {
  popupAddNewItem.open();
  newItemFormValidator.disableButton();
});

popupAddNewItem.setEventListeners();

//Редактирование профиля 
const popupEditProfile = new PopupWithForm({
  popup: popupEdit,
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  },
});

const userInfo = new UserInfo({
  nameSelector: nameSelector,
  descriptionSelector: descriptionSelector,
});

const addUserInfo = () => {
  popupEditProfile.open();
  const user = userInfo.getUserInfo();
  nameInput.value = user.nameSelector;
  jobInput.value = user.descriptionSelector;
};

popupEditBtnOpen.addEventListener('click', addUserInfo);

popupEditProfile.setEventListeners();

//Зум попап 
const popupZoomImage = new PopupWithImage(popupImage);

function handleCardClick(item) {
  popupZoomImage.open(item);
}

popupZoomImage.setEventListeners();

//Создание карточки 
function generateCard(cardInfo) {
  const card = new Card(cardInfo, '#card-element', (data) =>
    handleCardClick(data)
  );
  return card.addCard();
}

//Добавление элементов
const cardContainer = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = generateCard(item);
      cardContainer.addItem(card);
    },
  },
  '.elements'
);

cardContainer.renderItems();

//Валидация 
const editProfileForm = document.querySelector('.popup__form_edit');
const newItemForm = document.querySelector('.popup__form_new-item');

const editProfileFormValidator = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidator.enableValidation();

const newItemFormValidator = new FormValidator(validationSettings, newItemForm);
newItemFormValidator.enableValidation();