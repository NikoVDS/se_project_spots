const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editProfileModal.querySelector(".modal__close-button");

editProfileButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  editProfileModal.classList.add("modal_is-opened");
});

editCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  editProfileModal.classList.remove("modal_is-opened");
});

const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");

newPostBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  newPostModal.classList.remove("modal_is-opened");
});
