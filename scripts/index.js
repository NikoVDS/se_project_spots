//Open And Close Modal Functions

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

//Edit Profile Code

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editProfileModal.querySelector(".modal__close-button");
let currentUsername = editProfileModal.querySelector("#profile-name");
let currentDescription = editProfileModal.querySelector("#profile-description");
let profileNameElement = document.querySelector(".profile__name");
let profileDescriptionElement = document.querySelector(".profile__description");
const profileFormElement = editProfileModal.querySelector(".modal__form");

profileFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newUsername = editProfileModal.querySelector("#profile-name");
  const newDescription = editProfileModal.querySelector("#profile-description");
  profileNameElement.textContent = newUsername.value;
  profileDescriptionElement.textContent = newDescription.value;
  closeModal(editProfileModal);
});

editProfileButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openModal(editProfileModal);
  currentUsername.value = profileNameElement.textContent;
  currentDescription.value = profileDescriptionElement.textContent;
});

editCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal(editProfileModal);
});

//New Post Code

const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const captionInput = newPostModal.querySelector("#image-caption");
const linkInput = newPostModal.querySelector("#image-link");
const addCardFormElement = newPostModal.querySelector(".modal__form");

addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(captionInput.value);
  console.log(linkInput.value);
  closeModal(newPostModal);
});

newPostBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal(newPostModal);
});
