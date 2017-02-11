'use strict';

function createModal(imageDiv) {
  var modalDiv = document.getElementById('modal');
  var thumbName = imageDiv.querySelector('.image-img').getAttribute('title');
  var thumbUrl = imageDiv.querySelector('.image-img').getAttribute('data-target');
  var thumbAvatarUrl = imageDiv.querySelector('.info').querySelector('.avatar').getAttribute('src');
  var thumbAvatarAlt = imageDiv.querySelector('.info').querySelector('.avatar').getAttribute('alt');
  var thumbAvatarContributtion = imageDiv.querySelector('.info').querySelector('.attribution').innerHTML;
  var modalBg = document.querySelector('.modal-bg');
  var modalHTML = '';
  modalHTML += '\n    <h2 class="modal-title">' + thumbName + '</h2>\n    <img src="' + thumbUrl + '" alt="' + thumbName + '">\n    <div class="info">\n      <img src="' + thumbAvatarUrl + '" alt="' + thumbAvatarAlt + '" class="avatar">\n      <span class="attribution">' + thumbAvatarContributtion + '</span>\n    </div>\n    <a id="close-modal" aria-label="Close">&#215;</a>\n\n  '; // modal html ends here
  modalDiv.innerHTML = modalHTML;
  function modalIn() {
    var elem = document.getElementById("modal");
    var pos = window.pageYOffset;
    var count = 0;

    var id = setInterval(frame, 1);

    function frame() {

      if (count == 100) {
        clearInterval(id);
      } else {

        count++;
        pos++;
        elem.style.top = pos + 'px';
        elem.style.opacity = count / 100;
        modalBg.style.opacity = count / 150;
      }
    }
  }
  modalBg.style.display = 'block';
  modalIn();
}

var photos = document.querySelectorAll('.image');

function addClickListener() {
  var _loop = function _loop(i) {
    photos[i].children[0].addEventListener('click', function (e) {
      e.preventDefault();
      // setting variables for each  photo
      createModal(photos[i]);

      var modal = document.getElementById('modal');
      var dismissModal = document.getElementById('close-modal');
      var modalBg = document.querySelector('.modal-bg');
      dismissModal.addEventListener('click', function () {
        var id = setInterval(frame, 1);
        var count = 100;
        function frame() {
          if (count == 0) {
            clearInterval(id);
          } else {
            count--;
            modal.style.opacity = count / 100;
            modalBg.style.opacity = count / 150;
          }
        }
        setTimeout(function () {
          modal.style.top = '-100px';
          modal.innerHTML = '';
          modalBg.style.display = 'none';
        }, 1000);
      });
    });
  };

  for (var i = 0; i < photos.length; i++) {
    _loop(i);
  }
}
addClickListener();