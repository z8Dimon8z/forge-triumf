$(function () {

  // мобильная кнопка

  $('.header__burger, .menu__link').on('click', (event) => {
    $('.header__burger,.menu').toggleClass('header__burger--active');
    $('body').toggleClass('lock');
  });

  //микситап

  var mixer = mixitup('.works__content', {
    load: {
      filter: '.category-a',
    }
  });

  // модальное окно


  /* Записываем в переменные массив элементов-кнопок и подложку.
        Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');


  /* Перебираем массив кнопок */
  modalButtons.forEach(function (item) {

    /* Назначаем каждой кнопке обработчик клика */
    item.addEventListener('click', function (e) {

      /* Предотвращаем стандартное действие элемента. Так как кнопку разные
        люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
         Нужно подстраховаться. */
      e.preventDefault();

      /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
         и будем искать модальное окно с таким же атрибутом. */
      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector('.modal-demo[data-modal="' + modalId + '"]');


      /* После того как нашли нужное модальное окно, добавим классы
         подложке и окну чтобы показать их. */
      modalElem.classList.add('active');
      overlay.classList.add('active');
    }); // end click

  }); // end foreach


  closeButtons.forEach(function (item) {

    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal-demo');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });

  }); // end foreach


  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {

      document.querySelector('.modal-demo.active').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
    };
  }, false);


  overlay.addEventListener('click', function () {
    document.querySelector('.modal-demo.active').classList.remove('active');
    this.classList.remove('active');
  });

  // отправка почты

     //E-mail Ajax Send
	$(".form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

  // плавный скрол

  $(".menu__link, .logo").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),

      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });

})