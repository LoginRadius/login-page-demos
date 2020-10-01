
let update = {};

$(function () {
  change_password();
  profileUpdate();
  updateAccount();
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
    method: "GET",
    url: serverUrl + "/profile?auth=" + localStorage.getItem("lr-session-token"),
    cache: false,
    error: function () {
      localStorage.removeItem("lr-session-token");
      localStorage.removeItem("LRUserID");
      setCookie("lr-session-token", '', 0);
      window.location.replace("index.html");
    }
  }).done(function (ret) {
    if (ret.ThumbnailImageUrl) {
      $("#profile-image").html("<img src='" + ret.ThumbnailImageUrl + "'>");
    } else {
      $("#profile-image").html("<img src='./user-blank.png'>");
    }
    $("#profile-name").html("<b>" + (ret.FullName ? ret.FullName : "") + "</b>");
    $("#profile-provider").text(ret.Provider);
    $("#profile-email").text(ret.Email[0].Value);
    $("#profile-lastlogin").text(ret.LastLoginDate);

    $("#user-updateaccount-firstname").val(ret.FirstName);
    $("#user-updateaccount-lastname").val(ret.LastName);
    $("#user-updateaccount-about").val(ret.About);
    localStorage.setItem("LRUserID", ret.Uid);
  });
}

function change_password() {

  $("#btn-user-changepassword").click(function () {
    $("#user-changepassword-message").text("");

    if ($("#user-changepassword-oldpassword").val() == "" ||
      $("#user-changepassword-newpassword").val() == "") {
      $("#user-changepassword-message").text("Old Password/New Password are required fields.");
      $("#user-changepassword-message").attr("class", "error-message");
      return;
    }

    let data = {
      "oldpassword": $("#user-changepassword-oldpassword").val(),
      "newpassword": $("#user-changepassword-newpassword").val()
    }
    $.ajax({
      method: "PUT",
      url: serverUrl + "/profile/changepassword?auth=" + localStorage.getItem("lr-session-token"),
      data: JSON.stringify(data),
      contentType: "application/json",
      error: function (xhr) {
        let errorMessage;
        if (xhr.responseJSON) {
          errorMessage = xhr.responseJSON.Description;
        } else {
          errorMessage = xhr.statusText;
        }
        $("#user-changepassword-message").text(errorMessage);
        $("#user-changepassword-message").attr("class", "error-message");
      }
    }).done(function () {
      $("#user-changepassword-message").text("Password successfully changed.");
      $("#user-changepassword-message").attr("class", "success-message");
    });
  });
}

function updateAccount() {
  $("#btn-user-updateaccount").click(function () {
    $("#user-updateaccount-message").text("");

    let data = {};
    let dataFields = {
      "FirstName": $("#user-updateaccount-firstname").val().trim(),
      "LastName": $("#user-updateaccount-lastname").val().trim(),
      "About": $("#user-updateaccount-about").val().trim()
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
      url: serverUrl + "/profile/update?uid=" + localStorage.getItem("LRUserID"),
      data: JSON.stringify(data),
      contentType: "application/json",
      error: function (xhr) {
        let errorMessage;
        if (xhr.responseJSON) {
          errorMessage = xhr.responseJSON.Description;
        } else {
          errorMessage = xhr.statusText;
        }
        $("#user-updateaccount-message").text(errorMessage);
        $("#user-updateaccount-message").attr("class", "error-message");
      }
    }).done(function () {
      $("#user-updateaccount-message").text("Account successfully updated.");
      $("#user-updateaccount-message").attr("class", "success-message");
      profileUpdate();
    });
  });
}


