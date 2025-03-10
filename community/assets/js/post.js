import { formatNumber } from "./common.js";

const postTitle = document.getElementById("postTitle");
const postAuthor = document.getElementById("postAuthor");
const postAuthorImg = document.getElementById("postAuthorImg");
const postDate = document.getElementById("postDate");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const likeButton = document.getElementById("likeButton");
const viewCount = document.getElementById("viewCount");
const commentCount = document.getElementById("commentCount");
const deletePostButton = document.getElementById("deletePost");
const deleteModal = document.getElementById("deleteModal");
const cancelDeleteButton = document.getElementById("cancelDelete");
const confirmDeleteButton = document.getElementById("confirmDelete");
const commentInput = document.getElementById("commentInput");
const submitCommentButton = document.getElementById("submitComment");
const commentList = document.getElementById("commentList");
const commentForm = document.getElementById("commentForm");

const post = {
  title: "제목 1",
  likes: 123,
  comments: 20,
  views: 300000,
  author: "더미 작성자 1",
  date: "2021-01-01 00:00:00",
  profileImage: "../assets/images/default-profile.png",
  image: "../assets/images/post-image.jpg",
  content:
    "무엇을 얘기할까요? 아무말이라면, 삶은 항상 놀라운 모험이라고 생각합니다. \
      우리는 매일 새로운 경험을 하고 배우며 성장합니다. 때로는 어려움과 도전이 있지만, 그것들이 우리를 더 강하고 지혜롭게 만듭니다. \
      또한 우리는 주변의 사람들과 연결되며 사랑과 지지를 받습니다. 그래서 우리의 삶은 소중하고 의미가 있습니다.\
      \n자연도 아름다운 이야기입니다. 우리 주변의 자연은 끝없는 아름다움과 신비로움을 담고 있습니다. \
      산, 바다, 숲, 하늘 등 모든 것이 우리를 놀라게 만들고 감동시킵니다. 자연은 우리의 생명과 안정을 지키며 우리에게 힘을 주는 곳입니다. \
      \n마지막으로, 지식을 향한 탐구는 항상 흥미로운 여정입니다. \
      우리는 끝없는 지식의 바다에서 배우고 발견할 수 있으며, 이것이 우리를 더 깊이 이해하고 세상을 더 넓게 보게 해줍니다. \
      그런 의미에서, 삶은 놀라움과 경이로움으로 가득 차 있습니다. 새로운 경험을 즐기고 항상 앞으로 나아가는 것이 중요하다고 생각합니다.",
};

// 게시글 데이터 적용
postTitle.textContent = post.title;
postAuthor.textContent = post.author;
postAuthorImg.src = post.profileImage;
postDate.textContent = post.date;
postText.textContent = post.content;
postImage.src = post.image;
likeButton.textContent = `${formatNumber(post.likes)}\n좋아요수`;
viewCount.textContent = `${formatNumber(post.views)}\n조회수`;
commentCount.textContent = `${formatNumber(post.comments)}\n댓글`;

// 좋아요 버튼 클릭 이벤트
let liked = false;
likeButton.addEventListener("click", () => {
  liked = !liked;
  if (liked) {
    likeButton.style.backgroundColor = "#ACA0EB";
    likeButton.style.color = "white";
    post.likes++;
  } else {
    likeButton.style.backgroundColor = "#D9D9D9";
    likeButton.style.color = "black";
    post.likes--;
  }
  likeButton.textContent = `${formatNumber(post.likes)}\n좋아요수`;
});

// 게시글 삭제 버튼 클릭 시 모달 표시
deletePostButton.addEventListener("click", function () {
  deleteModal.style.display = "flex";
  document.body.classList.add("modal-open"); // 전체 배경 스크롤 방지
  document.querySelector("header").classList.add("modal-active"); // 헤더도 불투명하게 처리
});

// 모달 취소 버튼 클릭 시 숨기기
cancelDeleteButton.addEventListener("click", function () {
  if (targetComment) {
    targetComment = null; // 삭제할 댓글 초기화
  }
  deleteModal.style.display = "none";
  document.body.classList.remove("modal-open");
  document.querySelector("header").classList.remove("modal-active");
});

// 모달 삭제 확인 버튼 클릭 시 게시글 혹은 댓글 삭제
confirmDeleteButton.addEventListener("click", function () {
  if (targetComment) {
    commentList.removeChild(targetComment); // 댓글 삭제
    targetComment = null; // 초기화
    deleteModal.style.display = "none";
  } else {
    console.log("게시글이 삭제되었습니다.");
    window.location.href = "posts.html"; // 게시글 목록 페이지로 이동
  }
});

// 댓글 입력 시 버튼 활성화/비활성화
commentInput.addEventListener("input", function () {
  if (commentInput.value.trim().length > 0) {
    submitCommentButton.classList.remove("disabled");
  } else {
    submitCommentButton.classList.add("disabled");
  }
});

// 댓글 등록 form 태그로 관리
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  submitCommentButton.click();
});

let editingComment = null; // 현재 수정 중인 댓글을 저장할 변수
let targetComment = null; // 삭제할 댓글을 저장할 변수
// 댓글 등록 기능
submitCommentButton.addEventListener("click", function () {
  if (commentInput.value.trim().length === 0) return;

  if (editingComment) {
    // 댓글 수정 로직
    editingComment.querySelector(".comment-text").textContent =
      commentInput.value;
    submitCommentButton.textContent = "댓글 등록";
    editingComment = null; // 수정 완료 후 초기화
  } else {
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");
    commentItem.innerHTML = `
            <div class="comment-title">
              <div class="comment-info">
                  <img src="../assets/images/default-profile.png" alt="프로필 이미지">
                  <span>더미 작성자1</span>
                  <span>2021-01-01 00:00:00</span>
              </div>
              <div class="comment-actions">
                  <button class="edit-comment">수정</button>
                  <button class="delete-comment">삭제</button>
              </div>
            </div>
            <div class="comment-text">${commentInput.value}</div>
        `;

    commentList.appendChild(commentItem);

    // 수정 버튼 이벤트 추가
    commentItem
      .querySelector(".edit-comment")
      .addEventListener("click", function () {
        editingComment = commentItem; // 수정할 댓글 저장
        commentInput.value =
          editingComment.querySelector(".comment-text").textContent;
        submitCommentButton.textContent = "댓글 수정";
      });

    // 삭제 버튼 이벤트 추가
    commentItem
      .querySelector(".delete-comment")
      .addEventListener("click", function () {
        targetComment = commentItem; // 삭제할 댓글 저장
        deleteModal.style.display = "flex"; // 모달 표시
        document.querySelector("#deleteModal h3").textContent =
          "댓글을 삭제하시겠습니까?"; // 제목 변경
      });
  }
  commentInput.value = "";
  submitCommentButton.classList.add("disabled");
});
