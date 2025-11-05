// Variables

const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const captionInput = newPostModal.querySelector("#image-caption");
const linkInput = newPostModal.querySelector("#image-link");
const addCardFormElement = newPostModal.querySelector(".modal__form");
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
const profileFormElement = editProfileModal.querySelector(".modal__form");
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//Open And Close Modal Functions

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

//Edit Profile Code

profileFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileDescriptionElement.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
});

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
});

editCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

//New Post Code

addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(captionInput.value);
  console.log(linkInput.value);
  closeModal(newPostModal);
});

newPostBtn.addEventListener("click", function (evt) {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function (evt) {
  closeModal(newPostModal);
});

// Loops

initialCards.forEach(function (card) {
  console.log(card.name);
});
