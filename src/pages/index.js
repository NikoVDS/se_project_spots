import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

import { setButtonText } from "../utils/helpers.js";

// New Post Elements

const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const captionInput = newPostModal.querySelector("#image-caption");
const linkInput = newPostModal.querySelector("#image-link");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const formSubmitButtonNewPost = newPostModal.querySelector(
  ".modal__submit-button"
);

// Edit Profile Elements

const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editProfileModal.querySelector(".modal__close-button");
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description"
);
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const profileAvatarImage = document.querySelector(".profile__avatar-image");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const avatarModalBtn = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector("modal__submit-button");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Image Modal Elements

const imageModal = document.querySelector("#expanded-image-modal");
const imageModalExpand = imageModal.querySelector(".modal__image");
const imageModalCaption = imageModal.querySelector(".modal__caption");
const imageCloseBtn = imageModal.querySelector(".modal__close-button_image");

// Delete Elements

const deleteModal = document.querySelector("#delete-modal");
let selectedCard, selectedCardId;
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-button");
const deleteCancelBtn = deleteModal.querySelector(
  ".modal__submit-button_cancel"
);

// Default Page

const api = new Api({
  baseUrl:
    "https://around-api.en.tripleten-services.com/v1" /* this  is connected to the
  baseUrl constructor parameter, so if I wanted to use any other baseUrl I'd be able to do so, an example of loose-coupling.*/,
  headers: {
    authorization: "0cbb0ffd-2477-4d86-b8af-aab5102e9f17",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach(function (card) {
      const currentCardElement = getCardElement(card);
      cardsContainer.prepend(currentCardElement);
    });

    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    profileAvatarImage.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

const templateElement = document.querySelector("#cards-template");
const cardsContainer = document.querySelector(".cards__list");

// Create Cards Functions

function getCardElement(data) {
  const cardElement = templateElement.content.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".cards__caption");
  const cardImageElement = cardElement.querySelector(".cards__image");
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const cardLikeButton = cardElement.querySelector(".cards__like");

  if (data.isLiked) {
    cardLikeButton.classList.add("cards__like_type_liked");
  }

  function handleLike(evt, id) {
    // evt.target.classList.toggle("cards__like_type_liked");
    const isLiked = evt.target.classList.contains("cards__like_type_liked");
    api
      .changeLike(id, isLiked)
      .then(() => {
        if (isLiked) {
          evt.target.classList.remove("cards__like_type_liked");
        } else {
          evt.target.classList.add("cards__like_type_liked");
        }
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }

  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  const cardDeleteButton = cardElement.querySelector(".cards__delete");
  cardDeleteButton.addEventListener("click", (evt) => {
    const deleteButtonParentCard = evt.target.closest(".cards__card");
    handleDeleteCard(deleteButtonParentCard, data._id);
  });

  cardImageElement.addEventListener("click", function () {
    imageModalCaption.textContent = data.name;
    imageModalExpand.src = data.link;
    imageModalExpand.alt = data.name;
    openModal(imageModal);
  });

  return cardElement;
}

//Open And Close Modal Functions

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  allModals.forEach((modal) => {
    modal.addEventListener("click", function (evt) {
      if (evt.target === evt.currentTarget) {
        closeModal(modal);
      }
    });
  });
  document.addEventListener("keydown", escapeHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeHandler);
}

imageCloseBtn.addEventListener("click", function () {
  closeModal(imageModal);
});

const allModals = document.querySelectorAll(".modal");

function escapeHandler(evt) {
  if (evt.key === "Escape" && openModal) {
    allModals.forEach((modal) => {
      closeModal(modal);
    });
  }
}

//Edit Profile Functions

profileFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
      evt.target.reset();
      disableButton(formSubmitButtonNewPost, settings);
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    }); // Resetting the default text has to be done in a .finally() statement, so that if the request is succesful or fails, text will change either way
});

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(
    editProfileModal,
    [profileNameInput, profileDescriptionInput],
    settings
  );
});

editCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

//New Post Functions

addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true);

  api
    .postNewCard({ name: captionInput.value, link: linkInput.value })
    .then((data) => {
      cardsContainer.prepend(getCardElement(data));
      evt.target.reset();
      disableButton(formSubmitButtonNewPost, settings);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Avatar Functions

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true);

  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatarImage.src = data.avatar;
      evt.target.reset();
      disableButton(formSubmitButtonNewPost, settings);
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

avatarModalBtn.addEventListener("click", function (evt) {
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

avatarCloseBtn.addEventListener("click", function (evt) {
  closeModal(avatarModal);
});

// Delete Card Functions

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;

  setButtonText(submitBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    })
    .finally(() => {
      setButtonText(submitBtn, false, "Delete", "Deleting...");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

deleteCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

enableValidation(settings);
