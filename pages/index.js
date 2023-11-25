import './index.css';
import Card from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import { validationSettings } from "../utils/validationSettings";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithDeleteConfirm from "../components/PopupWithDeleteConfirm";
import {
  popupEditBtnOpen,
  nameInput,
  jobInput,
  popupEdit,
  profileName,
  profileDescription,
  popupImage,
  popupNewItemOpen,
  popupNewItemAdd,
  popupDelete,
} from "../utils/constants";

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
  formNewItemValidator.disableButton();
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
  profileName: profileName,
  profileDescription: profileDescription,
});

const openEditProfile = () => {
  popupEditProfile.open();
  const user = userInfo.getUserInfo();
  nameInput.value = user.profileName;
  jobInput.value = user.profileDescription;
};

popupEditBtnOpen.addEventListener('click', openEditProfile);

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
const buttonOpenPopupProfile = document.querySelector('.popup__form_edit');
const buttonOpenPopupItem = document.querySelector('.popup__form_new-item');

const formProfileValidator = new FormValidator(validationSettings, buttonOpenPopupProfile);
formProfileValidator.enableValidation();

const formNewItemValidator = new FormValidator(validationSettings, buttonOpenPopupItem);
formNewItemValidator.enableValidation();