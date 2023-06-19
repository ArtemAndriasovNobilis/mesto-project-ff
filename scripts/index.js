// переменные 

const popupBtnOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const resultName = document.querySelector('.profile__name');
const resultJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__field_key_name');
const jobInput = document.querySelector('.popup__field_key_job');
const popupEdit = document.querySelector('.popup_profile-edit');
const popupBtnClose = document.querySelector('.popup__close-btn');

const popupZoomCard = document.querySelector('.popup_zoom-card');
const popupImage = document.querySelector('.popup__image');
const popupCardInfo = document.querySelector('.popup__card-info');

// открытие попап ред. профиля

function openPopupEdit() {

  popupEdit.classList.add('popup_opened');
  nameInput.value = resultName.textContent;
  jobInput.value = resultJob.textContent;

}

// закрытие попап ред. профиля

function closePopupEdit() {

  popupEdit.classList.remove('popup_opened');

}

// сохранение данных из полей ввода 

function processFormSubmit(evt) {
  evt.preventDefault();

  resultName.textContent = nameInput.value;
  resultJob.textContent = jobInput.value;

  closePopupEdit();

}

// события открытия, закрытия, сохранения изменений 

popupBtnOpen.addEventListener('click', openPopupEdit);
popupBtnClose.addEventListener('click', closePopupEdit);
formElement.addEventListener('submit', processFormSubmit);

// массив

const initialCards = [
  {
    name: 'Остров Врангеля',
    link: 'https://sun6-23.userapi.com/impg/CLJif25bFR361cciVp0waRCxv5ZmV6dCbO4qeg/9Nl3XRk5F8w.jpg?size=525x508&quality=95&sign=ff3542c2406384a73c2309f83db5be30&type=album'
  },
  {
    name: 'Куршская коса',
    link: 'https://royal-travel.club/assets/images/trips/103/photo/03_kaliningrad_7_.jpg'
  },
  {
    name: 'Плато Путорана',
    link: 'https://priroda.club/uploads/posts/2022-06/1654081919_71-priroda-club-p-plato-putorana-ozero-vivi-priroda-krasivo-71.jpg'
  },
  {
    name: 'Рыбинск',
    link: 'https://sun6-21.userapi.com/s/v1/ig2/qgngftxrnOAzeJsmhqqsqFBCsMnkYDC9Re1LtlV2IITHXGl3MJJBVfdcf7h3YoLv-W3D6G6ecjmU5zrDuCFlBD2I.jpg?size=957x957&quality=95&crop=0,0,957,957&ava=1'
  },
  {
    name: 'Селигер',
    link: 'https://c1.35photo.pro/photos_col/r2/928/4641056_500r.jpg'
  },
  {
    name: 'Вулканы Камчатки',
    link: 'https://images.unsplash.com/photo-1634742223548-05d793b3f75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }

];

// template

function createCardElement(item) {
  const cardTemplate = document.querySelector('#card-element');
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardDelete = cardElement.querySelector('.element__delete');
  const cardLike = cardElement.querySelector('.element__like');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;

  // лайк и удаление карточек

  const processDelete = () => {
    cardElement.remove();
  };

  const processLike = () => {
    cardLike.classList.toggle('element__like_active');
  }

  // увеличение изображения, закрытие, открытие

  cardImage.addEventListener('click', () => {
    setImage();
    openPopupImage(popupZoomCard);
  });

  function setImage() {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCardInfo.textContent = item.name;
  };

  function openPopupImage() {
    popupZoomCard.classList.add('popup_opened');
  };

  function closePopupImage() {
    popupZoomCard.classList.remove('popup_opened');
  };

  // слушатели открытия, закрытия увеличения, лайк, удаление 

  popupZoomCard.addEventListener('click', openPopupImage);
  popupZoomCard.querySelector('.popup__close-btn').addEventListener('click', closePopupImage);


  cardDelete.addEventListener('click', processDelete);
  cardLike.addEventListener('click', processLike);

  return cardElement;

};

function addCard(item, container) {
  const card = createCardElement(item);
  container.append(card);

};

initialCards.forEach((item) => {
  const cards = document.querySelector('.elements');
  addCard(item, cards);
});


// попап добавления нового поста 

const popupNewItemOpen = document.querySelector('.profile__add-button');
const popupNewItemAdd = document.querySelector('.popup_item-add');
const popupNewItemForm = document.querySelector('.popup__edit-form');
const popupNewItemTitle = document.querySelector('.popup__field_item_name');
const popupNewItemLink = document.querySelector('.popup__field_item_link');
const popupNewItemSubmit = document.querySelector('.popup__save-btn');

// функция добавления новой карточки в массив

function openPopupNewItem() {
  popupNewItemAdd.classList.add('popup_opened');
}

function closePopupNewItem() {
  popupNewItemAdd.classList.remove('popup_opened');
}


const processNewItemSubmit = (Event) => {
  Event.preventDefault();
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
  addNewItem(cardElement, document.querySelector('.elements'));
  closePopupNewItem();


}

// слушатели открытия, закрытия, сохранения 

popupNewItemOpen.addEventListener('click', openPopupNewItem);
popupNewItemAdd.querySelector('.popup__close-btn').addEventListener('click', closePopupNewItem);
document.querySelector('.profile__add-button').addEventListener('click', openPopupNewItem);
popupNewItemAdd.addEventListener('submit', processNewItemSubmit);

















