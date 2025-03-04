const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const emailHelper = document.getElementById("email-helper");
const passwordHelper = document.getElementById("password-helper");

function updateButtonState() {
  const emailValid = validateEmail(emailInput.value);
  const passwordValid = validatePassword(passwordInput.value);

  if (emailValid && passwordValid) {
    loginBtn.classList.add("active");
    loginBtn.removeAttribute("disabled");
  } else {
    loginBtn.classList.remove("active");
    loginBtn.setAttribute("disabled", "true");
  }
}

emailInput.addEventListener("input", () => {
  if (emailInput.value === "" || !validateEmail(emailInput.value)) {
    emailHelper.style.display = "block";
  } else {
    emailHelper.style.display = "none";
  }
  updateButtonState();
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.value === "") {
    passwordHelper.textContent = "* 비밀번호를 입력해주세요";
    passwordHelper.style.display = "block";
  } else if (!validatePassword(passwordInput.value)) {
    passwordHelper.textContent =
      "* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    passwordHelper.style.display = "block";
  } else {
    passwordHelper.style.display = "none";
  }
  updateButtonState();
});

loginBtn.addEventListener("click", () => {
  // 유효성 검사 통과
  if (
    validateEmail(emailInput.value) &&
    validatePassword(passwordInput.value)
  ) {
    window.location.href = "post.html"; // 게시글 목록 페이지로 이동
  }
});
