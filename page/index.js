// переменные 

const popupBtnOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupBtnClose = document.querySelector('.popup__close-btn');
const resultName = document.querySelector('.profile__name');
const resultJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__field_key_name');
const jobInput = document.querySelector('.popup__field_key_job');

// открытие попап

function openPopup() {

    popup.classList.add('popup_opened');
    nameInput.value = resultName.textContent;
    jobInput.value = resultJob.textContent;

}

// закрытие попап

function closePopup() {

    popup.classList.remove('popup_opened');

}

// сохранение данных из полей ввода 

function handleFormSubmit (evt) {
    evt.preventDefault();

    resultName.textContent = nameInput.value;
    resultJob.textContent = jobInput.value;

    closePopup();
    
}

// события открытия, закрытия, сохранения изменений 

popupBtnOpen.addEventListener('click', openPopup);
popupBtnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
