
let update = {};

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// fuction used to fetch the user profile on the basis of access_token


var profileUpdate = function () {
  if (localStorage.getItem("lr-session-token") === null) {
    window.location.replace = "/";
    return;
  }

  $.ajax({
    method: "POST",
    url: serverUrl + "/profile?auth=" + localStorage.getItem("lr-session-token"),

    error: function (error) {
      console.log(error);
      // remove the access_token token from local storage and cookie

      localStorage.removeItem("lr-session-token");
      localStorage.removeItem("lr-user-uid");
      setCookie("lr-session-token", '', 0);
      window.location.href = "/";
    }
  }).done(function (ret) {
    if (typeof (ret.FullName) != "undefined" && ret.FullName != null) {
      $("#profile-name").html(ret.FullName);
    }
    $("#profile-provider").text(ret.Provider);
    $("#profile-email").text(ret.Email[0].Value);
    $("#profile-lastlogin").text(ret.LastLoginDate);

    $("#user-updateaccount-firstname").val(ret.FirstName);
    $("#user-updateaccount-lastname").val(ret.LastName);
    $("#user-updateaccount-about").val(ret.About);
    localStorage.setItem("lr-user-uid", ret.Uid);

  });
}

var changePassword = function () {

  $("#btn-user-changepassword").click(function () {
    let data = {
      "oldpassword": $("#user-changepassword-oldpassword").val(),
      "newpassword": $("#user-changepassword-newpassword").val(),
      "token": localStorage.getItem("lr-session-token"),
    }
    $.ajax({
      method: "PUT",
      url: serverUrl + "/profile/changepassword?",
      data: JSON.stringify(data),
      contentType: "application/json",
      error: function (xhr) {
        $("#user-changepassword-message").text(xhr.responseJSON.Description);
        $("#user-changepassword-message").attr("class", "error-message");
      }
    }).done(function () {
      $("#user-changepassword-message").text("Password successfully changed.");
      $("#user-changepassword-message").attr("class", "success-message");
    });
  });
}


var updateAccount = function () {
  $("#btn-user-updateaccount").click(function () {
    let data = {};
    let dataFields = {
      "FirstName": $("#user-updateaccount-firstname").val(),
      "LastName": $("#user-updateaccount-lastname").val(),
      "About": $("#user-updateaccount-about").val()
    }

    for (let key in dataFields) {
      if (dataFields[key] !== "") {
        data[key] = dataFields[key];
      } else {
        data[key] = update[key];
      }
    }

    $.ajax({
      method: "PUT",
      url: serverUrl + "/profile/update?uid=" + localStorage.getItem("lr-user-uid"),
      data: JSON.stringify(data),
      contentType: "application/json",
      error: function (xhr) {
        $("#user-updateaccount-message").text(xhr.responseJSON.Description);
        $("#user-updateaccount-message").attr("class", "error-message");
      }
    }).done(function () {
      $("#user-updateaccount-message").text("Account successfully updated.");
      $("#user-updateaccount-message").attr("class", "success-message");
      profileUpdate();
    });
  });
}


$(function () {
  updateAccount();
  changePassword();
  profileUpdate();
})


