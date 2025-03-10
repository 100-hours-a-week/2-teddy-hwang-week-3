import { hideHelperText, showHelperText } from "./common.js";
import { validateEmail, validatePassword } from "./validation.js";

const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const nicknameInput = document.getElementById("nickname");
const profilePicInput = document.getElementById("profilePic");
const profilePreview = document.getElementById("profilePreview");
const profileIcon = document.querySelector(".profile-icon");
const signupButton = document.getElementById("signup-btn");

const emailHelper = document.getElementById("email-helper");
const passwordHelper = document.getElementById("password-helper");
const confirmPasswordHelper = document.getElementById(
  "confirm-password-helper"
);
const nicknameHelper = document.getElementById("nickname-helper");
const profileHelper = document.getElementById("profile-helper");

function validateForm() {
  // 사진은 필수 항목이 아님
  const isEmailValid =
    emailInput.value.trim() !== "" && validateEmail(emailInput.value);
  const isPasswordValid =
    passwordInput.value.trim() !== "" && validatePassword(passwordInput.value);
  const isConfirmPasswordValid =
    confirmPasswordInput.value === passwordInput.value;
  const isNicknameValid =
    nicknameInput.value.trim() !== "" &&
    nicknameInput.value.length <= 10 &&
    !nicknameInput.value.includes(" ");
  if (
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isNicknameValid
  ) {
    signupButton.classList.add("active");
    signupButton.removeAttribute("disabled");
    signupButton.style.backgroundColor = "#7F6AEE";
    return true;
  } else {
    signupButton.classList.remove("active");
    signupButton.setAttribute("disabled", "true");
    signupButton.style.backgroundColor = "#ACA0EB";
    return false;
  }
}

function isEmailDuplicate(email) {
  const dummyEmails = ["test@example.com", "user@example.com"];
  return dummyEmails.includes(email);
}

function isNicknameDuplicate(nickname) {
  const dummyNicknames = ["testuser", "nickname123"];
  return dummyNicknames.includes(nickname);
}

// 프로필 사진 업로드 체크
profilePicInput.addEventListener("change", function () {
  if (profilePicInput.files.length > 0) {
    const file = profilePicInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      profilePreview.src = e.target.result;
      profilePreview.style.display = "block";
      profileIcon.style.display = "none"; // 아이콘 숨기기
      hideHelperText(profileHelper);
    };

    reader.readAsDataURL(file);
  } else {
    profilePreview.src = "";
    profilePreview.style.display = "none";
    profileIcon.style.display = "block";
    showHelperText(profileHelper, "*프로필 사진을 추가해주세요.");
  }
});

// 이메일 검사 (포커스 아웃 시 동작)
emailInput.addEventListener("blur", function () {
  // 이메일이 비어있는 경우
  if (emailInput.value.trim() === "") {
    showHelperText(emailHelper, "*이메일을 입력해주세요.");
  } else if (!validateEmail(emailInput.value)) {
    showHelperText(
      emailHelper,
      "*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)"
    );
  } else if (isEmailDuplicate(emailInput.value)) {
    showHelperText(emailHelper, "*중복된 이메일입니다.");
  } else {
    hideHelperText(emailHelper);
  }
  validateForm();
});

// 비밀번호 검사 (포커스 아웃 시 동작)
passwordInput.addEventListener("blur", function () {
  if (passwordInput.value.trim() === "") {
    showHelperText(passwordHelper, "*비밀번호를 입력해주세요.");
  } else if (!validatePassword(passwordInput.value)) {
    showHelperText(
      passwordHelper,
      "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
    );
  } else {
    hideHelperText(passwordHelper);
  }
  validateForm();
});

confirmPasswordInput.addEventListener("blur", function () {
  if (confirmPasswordInput.value.trim() === "") {
    showHelperText(confirmPasswordHelper, "*비밀번호를 한 번 더 입력해주세요.");
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    showHelperText(confirmPasswordHelper, "*비밀번호가 다릅니다.");
  } else {
    hideHelperText(confirmPasswordHelper);
  }
  validateForm();
});

// 닉네임 검사 (포커스 아웃 시 동작)
nicknameInput.addEventListener("blur", function () {
  if (nicknameInput.value.trim() === "") {
    showHelperText(nicknameHelper, "*닉네임을 입력해주세요.");
  } else if (nicknameInput.value.includes(" ")) {
    showHelperText(nicknameHelper, "*띄어쓰기를 없애주세요.");
  } else if (nicknameInput.value.length > 10) {
    showHelperText(nicknameHelper, "*닉네임은 최대 10자까지 작성 가능합니다.");
  } else if (isNicknameDuplicate(nicknameInput.value)) {
    showHelperText(nicknameHelper, "*중복된 닉네임입니다.");
  } else {
    hideHelperText(nicknameHelper);
  }
  validateForm();
});

// 버튼 클릭 시 유효성 검사 후 폼 제출 처리
signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // 유효성 검사 실패 시 폼 제출 막기
  if (validateForm()) {
    signupForm.submit();
    window.location.href = "login.html";
    console.log("회원 정보 저장 완료. 로그인 페이지로 이동합니다.");
  } else {
    console.log("유효성 검사 실패: 모든 필드를 올바르게 입력해야 합니다.");
  }
});
