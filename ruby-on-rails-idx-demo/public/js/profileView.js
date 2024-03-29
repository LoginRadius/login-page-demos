$(function () {

  $(window).on('hashchange', function () {
      // On every hash change the render function is called with the new hash.
      // This is how the navigation of our app happens.
      render(decodeURI(window.location.hash));
  }).trigger('hashchange');

  function render(url) {
      // This function decides what type of page to show 
      // depending on the current url hash value.

      // Get the keyword from the url.
      let temp = url.split('/')[0];

      // Hide whatever page is currently shown.
      $('.right-elem').removeClass('visible');
      $('.menu-options').removeClass('active');

      let map = {
          // The Homepage.
          '': function () {
              renderProfile();
          },
          // Profile page.
          '#profile': function () {
              renderProfile();
          },
          // Change Password page.
          '#changepassword': function () {
              renderChangePassword();
          },
          // Update Account page.
          '#account': function () {
              renderUpdateAccount();
          }
      };

      // Execute the needed function depending on the url keyword (stored in temp).
      if (map[temp]) {
          map[temp]();
      }
      // If the keyword isn't listed in the above - render the error page.
      else {
          renderErrorPage();
      }
  }

  function renderProfile() {
      let page = $('.profile-elem')
      let menuOption = $('#menu-profile')
      page.addClass('visible');
      menuOption.addClass('active');
      // Shows the profile page.
  }

  function renderChangePassword() {
      let page = $('.changepassword-elem')
      let menuOption = $('#menu-changepassword')
      page.addClass('visible');
      menuOption.addClass('active');
      // Shows the forgot password page.
  }

  function renderUpdateAccount() {
      let page = $('.updateaccount-elem')
      let menuOption = $('#menu-account')
      page.addClass('visible');
      menuOption.addClass('active');
      // Shows the forgot password page.
  }

  function renderErrorPage() {
      // Shows the error page.
  }

});