import { formatNumber } from "./common.js";
const postList = document.getElementById("postList");
const writePostBtn = document.getElementById("writePostBtn");

// 게시글 데이터 예시
const posts = [
  {
    title: "테스트 게시글 1",
    likes: 1500,
    comments: 20,
    views: 300000,
    date: "2021-01-01 00:00:00",
    author: "더미 작성자 1",
    profile: "../assets/images/default-profile.png",
  },
  {
    title: "테스트 게시글 2",
    likes: 200,
    comments: 10,
    views: 5000,
    date: "2021-01-02 12:30:00",
    author: "더미 작성자 2",
    profile: "../assets/images/default-profile.png",
  },
];

function createPostCard(post) {
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");
  postCard.innerHTML = `
          <div class="post-title">${
            post.title.length > 26 ? post.title.substring(0, 26) : post.title
          }</div>
          <div class="post-meta">
              <span>좋아요 ${formatNumber(post.likes)} 댓글 ${formatNumber(
    post.comments
  )} 조회수 ${formatNumber(post.views)}</span>
              <span>${post.date}</span>
          </div>
          <div class="post-footer">
              <img src="${post.profile}" alt="작성자 프로필">
              <span>${post.author}</span>
          </div>
      `;

  postCard.addEventListener("click", function () {
    window.location.href = "post.html"; // 게시글 상세 페이지 이동
  });
  return postCard;
}

function loadPosts() {
  console.log("페이지 로드");
  posts.forEach((post) => {
    postList.appendChild(createPostCard(post));
  });
}

writePostBtn.addEventListener("click", function () {
  window.location.href = "post_write.html"; // 게시글 작성 페이지 이동
});

loadPosts();

let isLoading = false;
// 인피니티 스크롤 구현 (실제 API 연동 필요)
window.addEventListener("scroll", function () {
  if (isLoading) return; // 데이터 로딩 중이면 실행 방지

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    isLoading = true;
    console.log("게시글 로드");
    loadPosts().then(() => {
      isLoading = false;
    });
  }
});
