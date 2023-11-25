class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
  }

  //отображение ошибки 
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.errorClass);
    errorElement.textContent = errorMessage;
  }

  //скрытие ошибки 
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
  }

  //проверка валидности 
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //определение, есть ли в форме невалидное поле
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  //отелючение кнопки 
  disableButton() {
    this._submitButton.classList.add(this._validationSettings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  //переключение кнопки при проверке валидности
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.classList.add(this._validationSettings.inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._validationSettings.inactiveButtonClass);
    }
  }

  //слушатель
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._submitButton = this._formElement.querySelector(this._validationSettings.submitButtonSelector);

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState();
  }

  //активация валидации
  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;