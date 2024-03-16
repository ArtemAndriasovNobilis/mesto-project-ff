import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, submitHandler }) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._fields = Array.from(this._form.querySelectorAll(".popup__field"));
    this._submitHandler = submitHandler;
    this._submitButton = this._form.querySelector(".popup__save-btn");
    this._submitButtonText = this._submitButton.textContent;
  }


  //Получение данных 
  _getInputValues() {
    const values = {};
    this._fields.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  //Слушатели
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }


  //Закрытие попапа
  close() {
    super.close();
    this._form.reset();
  }

processSaving(isSaving, savingText = "Соранение...") {
  if (isSaving) {
    this._submitButton.textContent = savingText;
  } else {
    this._submitButton.textContent = this._submitButtonText;
  }
}
}
