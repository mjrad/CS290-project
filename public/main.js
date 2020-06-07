
/*
READY ONCE WE HAVE COMMENT HTML
function insertNewComment(post, commentTxt){

  commentContext = {
    txt: commentTxt
  };

  var commentHtml = Handlebars.templates.comment(commentContext);

  var commentPost = document.getElementsByClassName('post')[i];
  commentPost = insertAdjacentHTML('beforeend', commentHtml);
}
*/

function insertNewPost(postAuthor, postURL, postCaption) {

  postContext = {
    postAuth: postAuthor,
    postImage: postURL,
    postCap: postCaption
  };

  var postHtml = Handlebars.templates.post(postContext);

  var postContainer = document.querySelector('main.post-container');
  postContainer.insertAdjacentHTML('beforeend', postHtml);

  /*
  var postElem = document.createElement('article');
  postElem.classList.add('post');

  var postIconElem = document.createElement('div');
  postIconElem.classList.add('post-icon');
  postIconElem.innerHTML = '<i class="fa fa-camera"></i>';
  postElem.appendChild(postIconElem);

  var postContentElem = document.createElement('div');
  postContentElem.classList.add('post-content');
  postElem.appendChild(postContentElem);

  var postAuthorNode = document.createTextNode(postAuthor);
  var postAuthorElem = document.createElement('p');
  postAuthorElem.classList.add('post-author');
  postAuthorElem.appendChild(postAuthorNode);
  postContentElem.appendChild(postAuthorElem);

  var postURLNode = document.createElement('img');
  postURLNode.src = postURL;
  var postURLElem = document.createElement('div');
  postURLElem.classList.add('post-image');
  postURLElem.appendChild(postURLNode);
  postContentElem.appendChild(postURLElem);

  var postCaptionNode = document.createTextNode(postCaption);
  postCaption.text = postCaption;
  var postCaptionElem = document.createElement('p');
  postCaptionElem.classList.add('post-caption');
  postCaptionElem.appendChild(postCaptionNode);
  postContentElem.appendChild(postCaptionElem);

  var postContainer = document.querySelector('main.post-container');
  postContainer.appendChild(postElem);
  */
}

var allPosts = [];

function modalAcceptClick() {

  var postAuthor = document.getElementById('post-author-input').value;
  var postURL = document.getElementById('post-image-input').value;
  var postCaption = document.getElementById('post-text-input').value;

  if (postAuthor && postURL && postCaption) {

    allPosts.push({
      author: postAuthor,
      url: postURL,
      caption: postCaption
    });
  } else {
    alert('Cannot upload an incomplete post!')
  }
}

function clearSearch() {

  document.getElementById('navbar-search-input').value = "";
  doSearchUpdate();
}

function showPostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPostModal = document.getElementById('create-post-modal');

  modalBackdrop.classList.remove('hidden');
  createPostModal.classList.remove('hidden');
}

function clearPostInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
    input.value = '';
  }
}

function hidePostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPostModal = document.getElementById('create-post-modal');

  modalBackdrop.classList.add('hidden');
  createPostModal.classList.add('hidden');
}

function postMatchesSearch(post, searchQuery) {

  if (!searchQuery) {
    return true;
  }
  searchQuery = searchQuery.trim().toLowerCase();
  return (post.author + " " + post.url + " " + post.caption).toLowerCase().indexOf(searchQuery) >= 0;
}

function doSearchUpdate() {

  var searchQuery = document.getElementById('navbar-search-input').value;

  var postContainer = document.querySelector('.post-container');
  if (postContainer) {
    while (postContainer.lastChild) {
      postContainer.removeChild(postContainer.lastChild);
    }
  }

  allPosts.forEach(function (post) {
    if (postMatchesSearch(post, searchQuery)) {
      insertNewPost(post.author, post.url, post.caption);
    }
  });
}

function parsePostElem(postElem) {

  var post = {};

  var postAuthorElem = postElem.querySelector('.post-author');
  post.author = postAuthorElem.textContent.trim();

  var postURLElem = postElem.querySelector('.post-image');
  post.url = postURLElem.textContent.trim();

  var postCaptionElem = postElem.querySelector('.post-caption');
  post.caption = postAuthorElem.textContent.trim();

  return post;
}

window.addEventListener('DOMContentLoaded', function () {

  var postElemsCollection = document.getElementsByClassName('post');
  for (var i = 0; i < postElemsCollection.length; i++) {
    allPosts.push(parsePostElem(postElemsCollection[i]));
  }

  var createPostButton = document.getElementById('create-post-button');
  if (createPostButton) {
    createPostButton.addEventListener('click', showPostModal);
  }

  var modalCloseButton = document.querySelector('#create-post-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', hidePostModal);
  }

  var modalCancelButton = document.querySelector('#create-post-modal .modal-cancel-button');
  if (modalCancelButton) {
    modalCancelButton.addEventListener('click', hidePostModal);
  }

  var modalAcceptButton = document.querySelector('#create-post-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', modalAcceptClick);
  }

  var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', doSearchUpdate);
  }

  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', doSearchUpdate);
  }

});
