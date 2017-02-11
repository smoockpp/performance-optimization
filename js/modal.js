function createModal(imageDiv) {
  let modalDiv = document.getElementById('modal');
  const thumbName = imageDiv.querySelector('.image-img').getAttribute('title');
  const thumbUrl = imageDiv.querySelector('.image-img').getAttribute('data-target');
  const thumbAvatarUrl = imageDiv.querySelector('.info').querySelector('.avatar').getAttribute('src');
  const thumbAvatarAlt = imageDiv.querySelector('.info').querySelector('.avatar').getAttribute('alt');
  const thumbAvatarContributtion = imageDiv.querySelector('.info').querySelector('.attribution').innerHTML;
  let modalBg = document.querySelector('.modal-bg');
  let modalHTML = ``;
  modalHTML += `
    <h2 class="modal-title">${thumbName}</h2>
    <img src="${thumbUrl}" alt="${thumbName}">
    <div class="info">
      <img src="${thumbAvatarUrl}" alt="${thumbAvatarAlt}" class="avatar">
      <span class="attribution">${thumbAvatarContributtion}</span>
    </div>
    <a id="close-modal" aria-label="Close">&#215;</a>

  ` // modal html ends here
  modalDiv.innerHTML = modalHTML;
  function modalIn() {
    let elem = document.getElementById("modal");
    let pos = window.pageYOffset;
    let count = 0;

    let id = setInterval(frame, 1);

    function frame() {

      if (count == 100) {
        clearInterval(id);
      } else {

        count++;
        pos++;
        elem.style.top = pos + 'px';
        elem.style.opacity = count/100;
        modalBg.style.opacity = count/150;
      }
    }
  }
  modalBg.style.display = 'block';
  modalIn();
}

let photos = document.querySelectorAll('.image');

function addClickListener() {
  for ( let photo of photos) {
    photo.children[0].addEventListener('click', function(e) {
      e.preventDefault();
      // setting variables for each  photo
      createModal(photo);

      let modal = document.getElementById('modal');
      let dismissModal = document.getElementById('close-modal');
      let modalBg = document.querySelector('.modal-bg');
      dismissModal.addEventListener('click', function() {
        let id = setInterval(frame, 1);
        let count = 100;
        function frame() {
          if (count == 0) {
            clearInterval(id);
          } else {
            count--;
            modal.style.opacity = count/100;
            modalBg.style.opacity = count/150;
          }
        }
        setTimeout(function() {
          modal.style.top = '-100px';
          modal.innerHTML = '';
          modalBg.style.display = 'none';
        }, 1000);
      });
    });
  }
}
addClickListener();
