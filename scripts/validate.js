// запуск валидации 

const enableValidation = (validationSettings) => {

    //массив 

    const form = Array.from(document.querySelectorAll(validationSettings.formSelector));

    form.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

        });

        setEvtListeners(formElement, validationSettings);
    });
}

// настройка попап филд 

const setEvtListeners = (formElement, validationSettings) => {

    //массив
    const input = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonSaveElement = formElement.querySelector(validationSettings.submitButtonSelector);

    //кнопка неактивна перед вводом данных 
    toggleButtonMode(input, buttonSaveElement, validationSettings);

    input.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonMode(input, buttonSaveElement, validationSettings);
            checkValidityInput(formElement, inputElement, validationSettings);
        });
    });
}

// проверка валидности введенных данных, отображает или скрывает error

const checkValidityInput = (formElement, inputElement, validationSettings) => {

    if (!inputElement.validity.valid) {
        setInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        deleteInputError(formElement, inputElement, validationSettings);
    }
};

// отображает error

const setInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__field_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

// скрывает error 

const deleteInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__field_error');
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

// проверка, есть ли поле с невалидными данными

const hasNoValidInput = (input) => {

    return input.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

// блокировка кнопок 

const toggleButtonMode = (input, buttonSaveElement, validationSettings) => {
    if (hasNoValidInput(input)) {
        disableButton(buttonSaveElement, validationSettings);
    } else {
        enableButton(buttonSaveElement, validationSettings);
    }
}

// отключение кнопки 

const disableButton = (buttonSaveElement, validationSettings) => {
    buttonSaveElement.classList.add(validationSettings.inactiveButtonClass);
    buttonSaveElement.setAttribute('disabled', true);
}



// включение кнопки  

const enableButton = (buttonSaveElement, validationSettings) => {

    buttonSaveElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonSaveElement.removeAttribute('disabled');

}

enableValidation(validationSettings);
