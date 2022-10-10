

$(function () {
  change_password();
  update_profile();
  account_update();
  

});
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// fuction used to fetch the user profile on the basis of access_token


let  update_profile = function () {
  if (localStorage.getItem("lr-session-token") === null) {
    window.location.href = "/minimal";
    return;
  }

  $.ajax({
    type: "GET",
    url: "/user",
    dataType: "json",
    data: $.param({
      token: localStorage.getItem("lr-session-token")
    }),
    success: function (ret) {
      if (typeof (ret.FullName) != "undefined" && ret.FullName != null) {
        $("#profile-name").html(ret.FullName);
      }
      localStorage.setItem("lr-user-uid",ret.Uid);
      $("#profile-provider").text(ret.Provider);
      $("#profile-email").text(ret.Email[0].Value);
      $("#profile-lastlogin").text(ret.LastLoginDate);

    },
    error: function (xhr, status, error) {

      // remove the access_token token from local storage and cookie

      localStorage.removeItem("lr-session-token");
      localStorage.removeItem("lr-user-uid");
      setCookie("lr-session-token", '', 0);
      window.location.href = "/minimal";
    }
  });
}
function account_update() {
  $("#btn-user-updateaccount").click(function() {
      if ($('#user-updateaccount-firstname').val().trim() == '' || $('#user-updateaccount-lastname').val().trim() == '' || $('#user-updateaccount-about').val().trim() == '') {
          $("#user-updateaccount-message").text("All fields are required.");
          $("#user-updateaccount-message").attr("class", "error-message");
          return;
      }

      $.ajax({
          type: "PUT",
          url: "/account",
          dataType: "json",
          data: $.param({
              uid: localStorage.getItem('lr-user-uid'),
              firstname: $("#user-updateaccount-firstname").val(),
              lastname: $("#user-updateaccount-lastname").val(),
              about: $("#user-updateaccount-about").val()
          }),
          success: function(res) {
              $("#user-updateaccount-message").text("Account successfully updated.");
              $("#user-updateaccount-message").attr("class", "success-message");
              update_profile();
          },
          error: function(xhr, status, error) {
              $("#user-updateaccount-message").text(xhr.responseText);
              $("#user-updateaccount-message").attr("class", "error-message");
          }
      });
  });
}
function change_password() {
  $("#btn-user-changepassword").click(function() {
      if ($('#user-changepassword-oldpassword').val().trim() == '' || $('#user-changepassword-newpassword').val().trim() == '') {
          $("#user-changepassword-message").text("All fields are required.");
          $("#user-changepassword-message").attr("class", "error-message");
          return;
      }
      $.ajax({
          type: "PUT",
          url: "/password/change",
          dataType: "json",
          data: $.param({
              token: localStorage.getItem('lr-session-token'),
              oldpassword: $("#user-changepassword-oldpassword").val(),
              newpassword: $("#user-changepassword-newpassword").val()
          }),
          success: function(res) {
              $("#user-changepassword-message").text("Password successfully changed.");
              $("#user-changepassword-message").attr("class", "success-message");
          },
          error: function(xhr, status, error) {
            console.log(xhr);
              $("#user-changepassword-message").text(xhr.responseJSON);
              $("#user-changepassword-message").attr("class", "error-message");
          }
      });
  });
}


setTimeout(function () {
  update_profile();
}, 2000)
