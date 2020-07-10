
let update = {};

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
    method: "POST",
    url: domainName + "/ajax_handler/profile",
    dataType: "json",
    data: $.param({
      token: localStorage.getItem("lr-session-token"),
      action: "getProfileByToken"
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
      // remove the access_token token from local storage and cookie

      localStorage.removeItem("lr-session-token");
      localStorage.removeItem("lr-user-uid");
      setCookie("lr-session-token", '', 0);
      window.location.replace("index.html");
    }
  });
}


$("#btn-user-changepassword").click(function () {
  $("#user-changepassword-message").text("");

  $.ajax({
    method: "POST",
    url: domainName + "/ajax_handler/profile",
    dataType: "json",
    data: $.param({
      token: localStorage.getItem("lr-session-token"),
      oldpassword: $("#user-changepassword-oldpassword").val(),
      newpassword: $("#user-changepassword-newpassword").val(),
      action: "changePassword"
    }),
    error: function (xhr) {
      $("#user-changepassword-message").text(xhr.responseJSON);
      $("#user-changepassword-message").attr("class", "error-message");
    }
  }).done(function (ret) {
    if (ret.status == "success") {
      $("#user-changepassword-oldpassword").val("");
      $("#user-changepassword-newpassword").val("");
      $("#user-changepassword-message").text(ret.message);
      $("#user-changepassword-message").attr("class", "success-message");
    } else if (ret.status == "error") {
      $("#user-changepassword-message").text(ret.message);
      $("#user-changepassword-message").attr("class", "error-message");
    }
  });
});

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
    method: "POST",
    url: domainName + "/ajax_handler/profile",
    dataType: "json",
    data: $.param({
      token: localStorage.getItem("lr-session-token"),
      firstname: data["FirstName"],
      lastname: data["LastName"],
      about: data["About"],
      action: "updateAccount"
    }),
    error: function (xhr) {
      $("#user-updateaccount-message").text(xhr.responseJSON);
      $("#user-updateaccount-message").attr("class", "error-message");
    }
  }).done(function (ret) {
    if (ret.status == "success") {
      $("#user-updateaccount-message").text(ret.message);
      $("#user-updateaccount-message").attr("class", "success-message");
      profileUpdate();
    } else if (ret.status == "error") {
      $("#user-updateaccount-message").text(ret.message);
      $("#user-updateaccount-message").attr("class", "error-message");
    }
  });
});


profileUpdate();
