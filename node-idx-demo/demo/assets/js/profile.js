
let update = {};


$(function () {
  handleChangePassword();
  handleUpdateAccount();
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// fuction used to fetch the user profile on the basis of access_token

let profileUpdate = function () {
  if (localStorage.getItem("lr-session-token") === null) {
    window.location.replace("index.html");
    return;
  }

  $.ajax({
    url: domainName + "/ajax_handler/login",
    type: 'POST',
    dataType: "json",
    data: $.param({
      token: localStorage.getItem("lr-session-token"),
      action: "getProfile"
    }),
    error: function () {
      localStorage.removeItem("lr-session-token");
      localStorage.removeItem("lr-user-uid");
      setCookie("lr-session-token", '', 0);
      window.location.replace("index.html");
    }
  }).done(function (ret) {
    if (ret.status == "success") {
      if (typeof (ret.data.FullName) != "undefined" && ret.data.FullName != null) {
        $("#profile-name").html(ret.data.FullName);
      }
      $("#profile-provider").text(ret.data.Provider);
      $("#profile-email").text(ret.data.Email[0].Value);
      $("#profile-lastlogin").text(ret.data.LastLoginDate);

      if (typeof (ret.data.FirstName) != "undefined" && ret.data.FirstName !== null) {
        $("#user-updateaccount-firstname").val(ret.data.FirstName);
      }
      if (typeof (ret.data.LastName) != "undefined" && ret.data.LastName !== null) {
        $("#user-updateaccount-lastname").val(ret.data.LastName);
      }
      if (typeof (ret.data.About) != "undefined" && ret.data.About !== null) {
        $("#user-updateaccount-about").val(ret.data.About);
      }
      update.FirstName = ret.data.FirstName;
      update.LastName = ret.data.LastName;
      update.About = ret.data.About;
    } else if (ret.status == "error") {
      localStorage.removeItem("lr-session-token");
      localStorage.removeItem("lr-user-uid");
      setCookie("lr-session-token", '', 0);
      window.location.replace("index.html");
    }
  });
}


function handleUpdateAccount() {
  $('#btn-user-updateaccount').on('click', function () {
    $("#user-updateaccount-errorMsg").text("");
    $("#user-updateaccount-successMsg").text("");

    $("#lr-loading").show();
    $.ajax({
      type: "POST",
      url: domainName + "/../ajax_handler/profile",
      dataType: "json",
      data: $.param({
        token: localStorage.getItem("lr-session-token"),
        firstname: $("#user-updateaccount-firstname").val(),
        lastname: $("#user-updateaccount-lastname").val(),
        about: $("#user-updateaccount-about").val(),
        action: "updateAccount"
      }),
      success: function (res) {
        $("#lr-loading").hide();
        if (res.status == 'error') {
          $("#user-updateaccount-errorMsg").text(res.message);
        } else if (res.status == 'success') {
          $("#user-updateaccount-successMsg").text(res.message);
        }
      },
      error: function (xhr, status, error) {
        $("#lr-loading").hide();
        $("#user-updateaccount-errorMsg").text(xhr.responseText);
      }
    });
  });
}

function handleChangePassword() {
  $('#btn-user-changepassword').on('click', function () {
    $("#user-changepassword-errorMsg").text("");
    $("#user-changepassword-successMsg").text("");
    if ($('#user-changepassword-oldpassword').val().trim() == '' || $('#user-changepassword-newpassword').val().trim() == '') {
      $("#user-changepassword-errorMsg").text("The password field is required.");
      return;
    } else if ($('#user-changepassword-newpassword').val().trim().length < '6') {
      $("#user-changepassword-errorMsg").text("The New Password field must be at least 6 characters in length.");
      return;
    }
    $("#lr-loading").show();
    $.ajax({
      type: "POST",
      url: domainName + "/../ajax_handler/profile",
      dataType: "json",
      data: $.param({
        token: localStorage.getItem("lr-session-token"),
        oldpassword: $("#user-changepassword-oldpassword").val(),
        newpassword: $("#user-changepassword-newpassword").val(),
        action: "changePassword"
      }),
      success: function (res) {
        $("#lr-loading").hide();
        if (res.status == 'error') {
          $("#user-changepassword-errorMsg").text(res.message);
        } else if (res.status == 'success') {
          $("#user-changepassword-oldpassword").val("");
          $("#user-changepassword-newpassword").val("");
          $("#user-changepassword-successMsg").text(res.message);
        }
      },
      error: function (xhr, status, error) {
        $("#lr-loading").hide();
        $("#user-changepassword-errorMsg").text(xhr.responseText);
      }
    });
  });
}

profileUpdate();

