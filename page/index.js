const openPopupBtn = document.querySelector('.profile__edit-button_popup-open');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-btn');
const resultName = document.querySelector('.profile__name');
const resultJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__field_key_name');
const jobInput = document.querySelector('.popup__field_key_job');

function toggle0pup() {
    popup.classList.toggle('popup_opened');
    nameInput.value = resultName.textContent;
    jobInput.value = resultJob.textContent
}

openPopupBtn.addEventListener('click', toggle0pup);

closePopupBtn.addEventListener('click', toggle0pup);

function handleFormSubmit (evt) {
    evt.preventDefault();

    resultName.textContent = nameInput.value;
    resultJob.textContent = jobInput.value;

    toggle0pup();

}

formElement.addEventListener('submit', handleFormSubmit);
