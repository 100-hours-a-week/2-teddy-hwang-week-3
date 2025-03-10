document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
      setupHeader();
    })
    .catch((error) => console.error("헤더를 불러오는 중 오류 발생:", error));
});

function setupHeader() {
  const backButton = document.getElementById("backButton");
  const headerProfile = document.getElementById("headerProfile");
  const currentPage = window.location.pathname.split("/").pop();

  // 페이지별 헤더 구성 변경
  if (currentPage === "login.html") {
    backButton.style.display = "none"; // 로그인 페이지 → 뒤로가기 숨김
    headerProfile.style.display = "none"; // 로그인 페이지 → 프로필 숨김
  } else if (currentPage === "signin.html") {
    backButton.style.display = "block"; // 회원가입 페이지 → 뒤로가기 표시
    headerProfile.style.display = "none"; // 회원가입 페이지 → 프로필 숨김
  } else if (currentPage === "posts.html") {
    backButton.style.display = "none"; // 뒤로가기 숨김
    headerProfile.style.display = "block"; // 프로필 표시
  } else {
    backButton.style.display = "block"; // 뒤로가기 표시
    headerProfile.style.display = "block"; // 프로필 표시
  }
  console.log(currentPage);
  // 뒤로가기 버튼 기능
  backButton.addEventListener("click", function () {
    window.history.back();
  });
}
