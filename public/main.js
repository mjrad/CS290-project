var allPosts = [];
var allComments = [];

function insertNewComment(postFromButton, commentTxt, commentAuthor){

  commentContext = {
    text: commentTxt,
    author: commentAuthor
  };

  var commentHtml = Handlebars.templates.comment(commentContext);

  var commentPost = document.getElementsByClassName('post');
  commentPost[postFromButton] = insertAdjacentHTML('beforeend', commentHtml);

}

function insertNewPost(postAuthor, postURL, postCaption) {

  postContext = {
    author: postAuthor,
    url: postURL,
    caption: postCaption
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


function modalAcceptClick() {

  var postAuthor = document.getElementById('post-author-input').value;
  var postURL = document.getElementById('post-image-input').value;
  var postCaption = document.getElementById('post-text-input').value;

  if (postAuthor && postURL && postCaption) {

    var tmp = document.getElementsByClassName('post');
    var request = new XMLHttpRequest();
    var requestUrl = "/addPost/" + tmp.length;
    var emptyComments = [];
    request.open('POST',requestUrl);
    var requestBody = JSON.stringify({
      author: postAuthor,
      url : postURL,
      caption: postCaption,
      comments : emptyComments
    });

    allPosts.push({
      author: postAuthor,
      url: postURL,
      caption: postCaption
    });

    clearSearch();
    hidePostModal();
  } else {
    alert('Cannot upload an incomplete post!')
  }
}

function comModalAcceptClick(postNum) {

  var commentTxt = document.getElementById('comment-text-input').value;
  var commentAuthor = document.getElementById('comment-author-input').value;

  if (commentTxt && commentAuthor) {

    allComments.push({
      commentText: commentTxt,
      commentAuthor: commentAuthor
    });
  } else {
    alert('Cannot upload an incomplete comment!')
  }
  hideCommentModal();
}

function clearSearch() {

  document.getElementById('navbar-search-input').value = "";
  doSearchUpdate();
}

function showCommentModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var createCommentModal = document.getElementById('create-comment-modal');

  modalBackdrop.classList.remove('hidden');
  createCommentModal.classList.remove('hidden');
}

function toggleComments(postFromButton) {
  console.log('Toggle Comments pressed at ', postFromButton);
  var toggle = document.getElementsByClassName('comments-section');
  console.log(toggle[postFromButton]);
  if (toggle[postFromButton].classList.contains('hidden')) {
    toggle[postFromButton].classList.remove('hidden');
  }
  else {
    toggle[postFromButton].classList.add('hidden');
  }
}

function clearCommentInputValues() {

  var commentInputElems = document.getElementsByClassName('comment-input-element');
  for (var i = 0; i < commentInputElems.length; i++) {
    var input = commentInputElems[i].querySelector('input, textarea');
    input.value = '';
  }
}

function hideCommentModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createCommentModal = document.getElementById('create-comment-modal');

  modalBackdrop.classList.add('hidden');
  createCommentModal.classList.add('hidden');
}

function showPostModal() {
  var modalBackdrop = document.getElementById('post-modal-backdrop');
  var createPostModal = document.getElementById('create-post-modal');
  console.log("Attempting to unhide");
  modalBackdrop.classList.remove('hidden');
  createPostModal.classList.remove('hidden');
  window.scrollTo(0,document.body.scrollHeight);
}

function clearPostInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
    input.value = '';
  }
}

function hidePostModal() {
  var modalBackdrop = document.getElementById('post-modal-backdrop');
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
      //insertNewComment(post, comment.text, comment.author);
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

  var comModalCloseButton = document.querySelector('#create-comment-modal .com-modal-close-button');
  if (comModalCloseButton) {
    comModalCloseButton.addEventListener('click', hideCommentModal);
  }

  var comModalCancelButton = document.querySelector('#create-comment-modal .com-modal-cancel-button');
  if (comModalCancelButton) {
    comModalCancelButton.addEventListener('click', hideCommentModal);
  }

  var comModalAcceptButton = document.querySelector('#create-comment-modal .com-modal-accept-button');
  if (comModalAcceptButton) {
      comModalAcceptButton.addEventListener('click', comModalAcceptClick);
  }

//FOR EACH POST, ATTACH A HANDLER EACH BUTTON
  var buttons = document.querySelectorAll("button");
  //for each button EXCEPT the 1st button (NAVBAR SEARCH) and the last 3 (ADD POST/COMMENT)
  for (var i = 1; i < buttons.length-6; i++) {
    //for the 4 buttons in each post
    console.log('there are ' , buttons.length-4, 'buttons')
    for (var group = 0; group <= 3; group++) {
      var deleteButton = buttons[i];
      var likeButton = buttons[i+1];
      var commentShow = buttons[i+2];
      var addCommentButton = buttons[i+3];
      //the function to access the proper post index for any given button is floor((i-1)/3)
      var postFromButton = Math.floor((i-1)/3);
      //add the listeners
      likeButton.addEventListener('click', toggle);
      console.log('added listener to LIKE at ', postFromButton, likeButton);
      commentShow.addEventListener('click', toggleComments, commentShow);
      console.log('added listener to SHOW COMMENTS at ', postFromButton);
      addCommentButton.addEventListener('click', showCommentModal, addCommentButton);
      console.log('added listener to ADD COMMENT at ', postFromButton);
      deleteButton.addEventListener('click', deletePost);
      console.log('added listener to DELETE at ', postFromButton, deleteButton);
      //jump to the next set of four buttons
      i += 4;
    }
  }

});

function toggle(likeButton) {
  console.log(likeButton, 'Like button pressed')
  if(likeButton.classList.contains("far")) {
    likeButton.classList.remove("far");
    likeButton.classList.add("fas");
  }
  else {
    likeButton.classList.remove("fas");
    likeButton.classList.add("far");
  }
}

function deletePost(postFromButton){
  console.log('You are deleting post', postFromButton);
  console.log(allPosts[postFromButton]);
  document.removeChild(allPosts[postFromButton]);
}
