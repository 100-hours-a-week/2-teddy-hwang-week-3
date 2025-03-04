document.addEventListener("DOMContentLoaded", function () {
  fetch("../components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("헤더를 불러오는 중 오류 발생:", error));
});
