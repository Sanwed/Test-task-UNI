const modal = document.querySelector('#modal');

const openModalBtn = document.querySelector('#open-modal');
openModalBtn.addEventListener('click', () => {
  openModal(modal);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeModal(modal);
  }
});

const closeModalBtn = document.querySelector('#close-modal');
closeModalBtn.addEventListener('click', () => {
  closeModal(modal);
});

function openModal(modal) {
  modal.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

// tel format
const phoneInput = document.querySelector('#phone');
phoneInput.addEventListener('focus', () => {
  if (!/^\+\d*$/.test(phoneInput.value)) {
    phoneInput.value = '+7 ';
  }
});

phoneInput.addEventListener('keypress', (evt) => {
  if (!/\d/.test(evt.key)) {
    evt.preventDefault();
  }
  
  let curLen = phoneInput.value.length;
  
  if (curLen >= 0 && curLen <= 2) {
    phoneInput.value = '+7 ';
  }
  
  if (curLen === 6) {
    phoneInput.value = phoneInput.value + ' ';
  }
  
  if (curLen === 10) {
    phoneInput.value = phoneInput.value + '-';
  }
  
  if (curLen === 13) {
    phoneInput.value = phoneInput.value + '-';
  }
});

const logoBtn = document.querySelector('#logo-delete');
logoBtn.addEventListener('click', () => {
  const img = document.querySelector('.logo-label');
  img.style.backgroundImage = '';
  logoBtn.classList.remove('active');
});

// Logo file load
const logoInput = document.querySelector('#logo');
logoInput.addEventListener('change', (evt) => {
  if (!evt.target.files.length) {
    return;
  }
  
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    const img = document.querySelector('.logo-label');
    img.style.backgroundImage = `url("${fileReader.result}")`;
    showBtn(logoBtn);
  });
  
  fileReader.readAsDataURL(evt.target.files[0]);
});

function showBtn(btn) {
  btn.classList.add('active');
}
