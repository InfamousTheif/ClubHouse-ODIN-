const closeFormButton = document.querySelector(".close-form-button");
const postForm = document.querySelector(".post-form-popup");
const showPostForm = document.querySelector(".button-wrapper__post-button")

closeFormButton.addEventListener('click', () => {
  postForm.style.display = "none";
});

showPostForm.addEventListener('click', () => {
  postForm.style.display = "flex";
});
