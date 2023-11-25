import Popup from "./Popup";

export default class PopupWithDeleteConfirm extends Popup {
    constructor(popup) {
        super(popup);
        this._popup = popup;
        this._form = this._popup.querySelector(".popup__form");
    }

    deleteBtnEvent() {
        this._handleSubmit;
    }

    open() {
        super.open();
      }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            this._handleSubmit();
            evt.preventDefault();
        })
    }
}