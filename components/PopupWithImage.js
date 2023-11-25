import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector('.popup__image');
    this._imageName = this._popup.querySelector('.popup__card-info');
  }

  //Открытие
  open({ link, name }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._imageName.textContent = name;
  }
}