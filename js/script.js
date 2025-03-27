$(document).ready(function () {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    $('.catalog-item__link').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

      })
    });
    $('.catalog-item__back').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        
      })
    });
    function toggleSlide(item){
      $(item).each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    };
    toggleClass('.catalog__item_list');
    toggleClass('.catalog__item_back');
});

const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  responsive : {
    2000:{
      nav: false
    },
    1078: {
      nav: true
    },
    768: {
      nav: true
    },
    320: {
      nav: true
    }
    
    
  }

  // nav: false
  
});

function buttonClick(selector){
  document.querySelector(`.${selector}`).addEventListener('click', function(){
    slider.goTo(`${selector}`);
  })
}

buttonClick('prev');
buttonClick('next');

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const consultationDiv = document.getElementById("consultation");
  const consultationsDiv = document.getElementById("consultations");
  const promoDiv = document.querySelector(".promo__wrapper"); // Выбираем контейнер внутри секции promo

  function hideAuthForms(email) {
      if (consultationsDiv) consultationDiv.style.display = "none";
      if (consultationsDiv) consultationsDiv.style.display = "none";

      // Создаём картинку вместо кнопки профиля
      let profileImage = document.createElement("img");
      profileImage.src = "https://cdn-icons-png.flaticon.com/512/91/91700.png";
      profileImage.style.width = "40px";  
      profileImage.style.height = "40px";
      profileImage.style.marginTop = "14px";
      profileImage.style.marginRight = "10px";
      profileImage.style.cursor = "pointer";  

      // Проверяем, если promoDiv существует, добавляем картинку в неё
      if (promoDiv) {
          promoDiv.appendChild(profileImage);
      } else {
          document.body.appendChild(profileImage);
      }

      // Создаём всплывающее окно профиля
      let profilePopup = document.createElement("div");
      profilePopup.style.display = "none";
      profilePopup.style.position = "fixed";
      profilePopup.style.top = "20%";
      profilePopup.style.right = "-148px";
      profilePopup.style.transform = "translate(-50%, -50%)";
      profilePopup.style.width = "300px";
      profilePopup.style.background = "white";
      profilePopup.style.padding = "20px";
      profilePopup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
      profilePopup.style.textAlign = "center";

      let userIcon = document.createElement("div");
      userIcon.innerHTML = "👤";
      userIcon.style.fontSize = "50px";

      let userName = document.createElement("p");
      let storedUser = JSON.parse(localStorage.getItem(email));
      userName.innerText = `Имя: ${storedUser.username}`;

      let userInfo = document.createElement("p");
      userInfo.innerText = "Инет магаз норм, но нафиг он тебе?";

      let logoutButton = document.createElement("button");
      logoutButton.innerText = "Я хз";
      logoutButton.style.marginTop = "10px";
      logoutButton.style.padding = "10px 15px";
      logoutButton.style.background = "red";
      logoutButton.style.color = "white";
      logoutButton.style.border = "none";
      logoutButton.style.cursor = "pointer";
      logoutButton.addEventListener("click", function () {
          localStorage.removeItem("loggedInUser");
          location.reload();
      });

      let closeButton = document.createElement("button");
      closeButton.innerText = "Хз но надо";
      closeButton.style.marginTop = "10px";
      closeButton.style.marginLeft = "10px";
      closeButton.style.padding = "10px 15px";
      closeButton.style.background = "gray";
      closeButton.style.color = "white";
      closeButton.style.border = "none";
      closeButton.style.cursor = "pointer";
      closeButton.addEventListener("click", function () {
          profilePopup.style.display = "none";
      });

      profilePopup.appendChild(userIcon);
      profilePopup.appendChild(userName);
      profilePopup.appendChild(userInfo);
      profilePopup.appendChild(logoutButton);
      profilePopup.appendChild(closeButton);
      document.body.appendChild(profilePopup);

      // Открытие всплывающего окна при клике на изображение
      profileImage.addEventListener("click", function () {
          profilePopup.style.display = "block";
      });
  }

  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
      hideAuthForms(loggedInUser);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let username = document.getElementById("registerUsername").value;
      let password = document.getElementById("registerPassword").value;
      let email = document.getElementById("registerEmail").value;

      if (localStorage.getItem(email)) {
          alert("Пользователь с таким email уже существует!");
          return;
      }

      let user = { username, password, email };
      localStorage.setItem(email, JSON.stringify(user));

      alert("Регистрация успешна! Теперь вы можете войти.");
      registerForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let email = document.getElementById("loginEmail").value.trim();  // Ensure no extra spaces
      let password = document.getElementById("loginPassword").value.trim();  // Ensure no extra spaces

      // Debugging logs
      console.log("Entered email:", email);
      console.log("Entered password:", password);

      let storedUser = localStorage.getItem(email);

      if (!storedUser) {
          alert("Пользователь не найден!");
          return;
      }

      let user = JSON.parse(storedUser);
      if (user.password === password) {
          alert(`Добро пожаловать, ${user.username}!`);
          localStorage.setItem("loggedInUser", email);
          hideAuthForms(email);
      } else {
          alert("Неверный пароль!");
      }
    });
  }
});
