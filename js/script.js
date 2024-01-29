jQuery(document).ready(function ($) {
  var $form_modal = $('.cd-user-modal'),
    $form_login = $form_modal.find('#cd-login'),
    $form_signup = $form_modal.find('#cd-signup'),
    $form_forgot_password = $form_modal.find('#cd-reset-password'),
    $form_modal_tab = $('.cd-switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
    $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
    $sign_up_but = $('.sign-up-button');
  $log_in_but = $('.log-in-button');

  $sign_up_but.on('click', function (event) {
    $form_modal.addClass('is-visible');
    signup_selected();
  });

  $log_in_but.on('click', function (event) {
    $form_modal.addClass('is-visible');
    $('.navbar-toggle').click();
    login_selected();
  })

  $('.cd-user-modal').on('click', function (event) {
    if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
      $form_modal.removeClass('is-visible');
    }
  });

  $(document).keyup(function (event) {
    if (event.which == '27') {
      $form_modal.removeClass('is-visible');
    }
  });

  $form_modal_tab.on('click', function (event) {
    event.preventDefault();
    ($(event.target).is($tab_login)) ? login_selected() : signup_selected();
  });

  $('.hide-password').on('click', function () {
    var $this = $(this),
      $password_field = $this.prev('input');

    ('password' == $password_field.attr('type')) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
    ('Hide' == $this.text()) ? $this.text('Show') : $this.text('Hide');
    $password_field.putCursorAtEnd();
  });

  $forgot_password_link.on('click', function (event) {
    event.preventDefault();
    forgot_password_selected();
  });

  $back_to_login_link.on('click', function (event) {
    event.preventDefault();
    login_selected();
  });

  function login_selected() {
    $form_login.addClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.addClass('selected');
    $tab_signup.removeClass('selected');
  }

  function signup_selected() {
    $form_login.removeClass('is-selected');
    $form_signup.addClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.removeClass('selected');
    $tab_signup.addClass('selected');
  }

  function forgot_password_selected() {
    $form_login.removeClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.addClass('is-selected');
  }

  if (!Modernizr.input.placeholder) {
    $('[placeholder]').focus(function () {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    }).blur(function () {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function () {
      $(this).find('[placeholder]').each(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });
  }

});

jQuery.fn.putCursorAtEnd = function () {
  return this.each(function () {
    if (this.setSelectionRange) {
      var len = $(this).val().length * 2;
      this.setSelectionRange(len, len);
    } else {
      $(this).val($(this).val());
    }
  });
};

function setCookie(key, value, expirationDays) {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000)); // Set expiration time in milliseconds

  const expires = "expires=" + date.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function getCookie(key) {
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}