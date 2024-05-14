const elRender = document.querySelector(".js-render");
const elTemplate = document.querySelector(".js-template").content;

// POSTS
const elPostRender = document.querySelector(".js-post-render");
const elPostTemplate = document.querySelector(".js-posts-template").content;

// COMMINT
const elCommintsRender = document.querySelector(".js-commints-render");
const elCommintsTemplate = document.querySelector(
  ".js-commints-template"
).content;

let BASE__URL = "https://jsonplaceholder.typicode.com";

const reqObject = {
  users: false,
  posts: false,
  comment: false,
};

// USER__URL
async function fetchData(url, { users, posts, comment }) {
  try {
    let response = await fetch(url);
    let data = await response.json();

    if (users) return renderData(data, elRender);
    if (posts) return poostRender(data, elPostRender);
    if (comment) return commintRender(data, elCommintsRender);
  } catch (error) {
    console.log(error);
    console.log("xatolik yuz berdi", error);
  } finally {
    // console.log("Bajarildi✅");
  }
}
fetchData(BASE__URL + "/users", { ...reqObject, users: true });

function renderData(arr, node) {
  node.innerHTML = "";
  let docFrg = document.createDocumentFragment();
  arr.forEach((item) => {
    let clone = elTemplate.cloneNode(true);
    clone.querySelector(".js-id").textContent = item.id;
    clone.querySelector(".js-name").textContent = item.name;
    clone.querySelector(".js-email").textContent = item.email;
    clone.querySelector(".js-phone-number").textContent = item.phone;
    clone.querySelector(".js-street").textContent = item.address.street;
    clone.querySelector(".js-suite").textContent = item.address.suite;
    clone.querySelector(".js-city").textContent = item.address.city;
    clone.querySelector(".js-item").dataset.dataId = item.id;
    docFrg.appendChild(clone);
  });
  node.appendChild(docFrg);
}

elRender.addEventListener("click", (evt) => {
  evt.preventDefault();
  let userId = evt.target.closest(".js-item").dataset.dataId;
  fetchData(BASE__URL + `/posts?userId=${userId}`, {
    ...reqObject,
    posts: true,
  });
});

function poostRender(post, node) {
  node.innerHTML = "";
  const postDocFrg = document.createDocumentFragment();
  post.forEach((item) => {
    let postClone = elPostTemplate.cloneNode(true);
    postClone.querySelector(".js-post-id").textContent = item.id;
    postClone.querySelector(".js-post-title").textContent = item.title;
    postClone.querySelector(".js-body").textContent = item.body;
    postClone.querySelector(".js-post-item").dataset.dataId = item.id;
    postDocFrg.appendChild(postClone);
  });
  node.appendChild(postDocFrg);
}

elPostRender.addEventListener("click", (evt) => {
  evt.preventDefault();
  elCommintsRender.style.padding = "15px";

  let commintsId = evt.target.closest(".js-post-item").dataset.dataId;
  fetchData(BASE__URL + `/comments?postId=${commintsId}`, {
    ...reqObject,
    comment: true,
  });
});

function commintRender(comment, node) {
  node.innerHTML = "";
  const commentDocFrg = document.createDocumentFragment();
  for (const item of comment) {
    let commentsClone = elCommintsTemplate.cloneNode(true);
    commentsClone.querySelector(".js-commint-id").textContent = item.id;
    commentsClone.querySelector(".js-commint-name").textContent = item.name;
    commentsClone.querySelector(".js-commint-email").textContent = item.email;
    commentsClone.querySelector(".js-commint-body").textContent = item.body;
    commentDocFrg.appendChild(commentsClone);
  }
  node.appendChild(commentDocFrg);
}
