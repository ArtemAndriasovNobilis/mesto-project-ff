import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, submitHandler }) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._fields = this._form.querySelectorAll(".popup__field");
    this._submitHandler = submitHandler;
  }


  //Получение данных 
  _getInputValues() {
    this._fieldList = Array.from(this._fields);
    this._values = {};
    this._fieldList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
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
}