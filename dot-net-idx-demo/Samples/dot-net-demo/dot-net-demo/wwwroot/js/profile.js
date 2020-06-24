const url = window.location.href;
const domainName = url.substring(0, url.lastIndexOf("/"));
let update = {};


function setCookie(cname, cvalue, exdays) {
    var d = new Date(); 
    d.setTime(d.getTime() + (exdays* 24* 60* 60* 1000)); 
    var expires = "expires="+d.toUTCString(); 
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
    }



let profileUpdate = function () {
    if (localStorage.getItem("lr-session-token") === null) {
        window.location.replace("/");
        return;
    }
    console.log(m_options);
    $.ajax({
        method: "GET",
        url: m_options.getProfileUrl + "?auth=" + localStorage.getItem("lr-session-token"),
        error: function () {
            localStorage.removeItem("lr-session-token");
            localStorage.removeItem("lr-user-uid");
            window.location.replace("/");
        }
    }).done(function (ret) {
        if (ret.FullName === null) {
            $("#profile-name").html("");
        } else {
            $("#profile-name").html("<b>" + ret.FullName + "</b>");
        }
        if (ret.ImageUrl != null && ret.ImageUrl != undefined && ret.ImageUrl != "") {
            $("#profile-image").attr('src', ret.ImageUrl)
      }
      console.log(ret);
      localStorage.setItem("lr-user-uid",ret.Uid);
        $("#profile-provider").text(ret.Provider);
        $("#profile-email").text(ret.Email[0].Value);
        $("#profile-lastlogin").text(ret.LastLoginDate);
        $("#user-updateaccount-firstname").val(ret.FirstName);
        $("#user-updateaccount-lastname").val(ret.LastName);
        $("#user-updateaccount-about").val(ret.About);
    });
}

    
$("#btn-user-updateaccount").click(function () {
  let data = {};

  if ($("#user-updateaccount-firstname").val() === "" &&
    $("#user-updateaccount-lastname").val() === "" &&
    $("#user-updateaccount-about").val() === "") {
    $("#user-updateaccount-message").text("Please input some data that needs to be updated.");
    $("#user-updateaccount-message").attr("class", "error-message");
    return;
  }
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
    url: m_options.updateUrl + "?uid=" + localStorage.getItem("lr-user-uid"),
    data: JSON.stringify(data),
    contentType: "application/json",
    error: function (xhr) {
      $("#user-updateaccount-message").text(xhr.responseJSON.value.description);
      $("#user-updateaccount-message").attr("class", "error-message");
    }
  }).done(function () {
    $("#user-updateaccount-firstname").val("");
    $("#user-updateaccount-lastname").val("");
    $("#user-updateaccount-about").val("");
    $("#user-updateaccount-message").text("Account successfully updated.");
    $("#user-updateaccount-message").attr("class", "success-message");
    profileUpdate();
  });
});


$("#btn-user-changepassword").click(function () {
  if (!$("#user-changepassword-oldpassword").val()) {
    $("#user-changepassword-message").text("Old Password is a required field");
    $("#user-changepassword-message").attr("class", "error-message");
    return;
  } else if (!$("#user-changepassword-newpassword").val()) {
    $("#user-changepassword-message").text("New Password is a required field");
    $("#user-changepassword-message").attr("class", "error-message");
    return;
  }
  let data = {
    "oldpassword": $("#user-changepassword-oldpassword").val(),
    "newpassword": $("#user-changepassword-newpassword").val()
  }
  $.ajax({
    method: "PUT",
    url: m_options.changePasswordUrl + "?auth=" + localStorage.getItem("lr-session-token"),
    data: JSON.stringify(data),
    contentType: "application/json",
    error: function (xhr) {
      $("#user-changepassword-message").text(xhr.responseJSON.value.description);
      $("#user-changepassword-message").attr("class", "error-message");
    }
  }).done(function () {
    $("#user-changepassword-oldpassword").val("");
    $("#user-changepassword-newpassword").val("");
    $("#user-changepassword-message").text("Password successfully changed.");
    $("#user-changepassword-message").attr("class", "success-message");
  });
});

setTimeout(function () {
  profileUpdate();
}, 2000)
