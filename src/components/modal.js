// универсальное закрытие попапа на esc

export function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'))
    }
  }
  
  // универсальное закрытие попапа на оверлей
  
 export const closePopupOverlay = (evt) => {
    const isPopupOverlay = evt.target.classList.contains('popup');
  
    if (isPopupOverlay) {
      closePopup(evt.target)
    }
  };
  
  // универсальные функции открытия и закрытия попапов
  
 export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
    document.addEventListener('mousedown', closePopupOverlay);
  }
  
 export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    document.removeEventListener('mousedown', closePopupOverlay);
  }