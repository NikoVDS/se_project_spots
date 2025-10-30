//Edit Profile Code

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editProfileModal.querySelector(".modal__close-button");
let currentUsername = editProfileModal.querySelector("#profile-name");
let currentDescription = editProfileModal.querySelector("#profile-description");
let nameInput = document.querySelector(".profile__name");
let descriptionInput = document.querySelector(".profile__description");
const submitBtnProfile = editProfileModal.querySelector(
  "#edit-profile-modal .modal__submit-button"
);

editProfileButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  editProfileModal.classList.add("modal_is-opened");
  currentUsername.value = nameInput.textContent;
  currentDescription.value = descriptionInput.textContent;
});

editCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  editProfileModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newUsername = editProfileModal.querySelector("#profile-name");
  const newDescription = editProfileModal.querySelector("#profile-description");
  nameInput.textContent = newUsername.value;
  descriptionInput.textContent = newDescription.value;
}

submitBtnProfile.addEventListener("click", function () {
  editProfileModal.addEventListener("submit", handleProfileFormSubmit);
  editProfileModal.classList.remove("modal_is-opened");
});

//New Post Code

const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const captionInput = newPostModal.querySelector("#image-caption");
const linkInput = newPostModal.querySelector("#image-link");
const submitBtnImage = newPostModal.querySelector(
  "#new-post-modal .modal__submit-button"
);

newPostBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  newPostModal.classList.remove("modal_is-opened");
});

function handleImageSubmission(evt) {
  evt.preventDefault();
  console.log(captionInput.value);
  console.log(linkInput.value);
}

submitBtnImage.addEventListener("click", function () {
  newPostModal.addEventListener("submit", handleImageSubmission);
  newPostModal.classList.remove("modal_is-opened");
});
