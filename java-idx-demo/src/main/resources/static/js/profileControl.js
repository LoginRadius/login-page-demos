$(function () {
  update_profile();
  change_password();
  account_update();
  logout();
});

function update_profile() {
  if (localStorage.getItem("LRTokenKey") === null) {
    window.location.href = "/";
    return;
  }

  $.ajax({
    type: "GET",
    url: "/user",
    dataType: "json",
    data: $.param({
      token: localStorage.getItem("LRTokenKey")
    }),
    success: function (res) {
      if (res.ImageUrl != null && res.ImageUrl != undefined && res.ImageUrl != "") {
        $("#profile-image").attr('src', res.ImageUrl)
      }
      localStorage.setItem("lr-user-uid", res.Uid);
      $("#profile-name").html("<b>" + res.FullName + "</b>");
      $("#profile-provider").text("Provider: " + res.Provider);
      $("#profile-email").text(res.Email[0].Value);
      $("#profile-lastlogin").text("Last Login Date: " + res.LastLoginDate);
    },
    error: function (xhr, status, error) {
      localStorage.removeItem("LRTokenKey");
      localStorage.removeItem("lr-user-uid");
      window.location.href = "/";
    }
  });
}

function change_password() {
    $("#btn-user-changepassword").click(function() {
        $.ajax({
            type: "PUT",
            url: "/password/change",
            dataType: "json",
            data: $.param({
                token: localStorage.getItem('LRTokenKey'),
                oldpassword: $("#user-changepassword-oldpassword").val(),
                newpassword: $("#user-changepassword-newpassword").val()
            }),
            success: function(res) {
                console.log("Change success::", res);
                $("#user-changepassword-message").text("Password successfully changed.");
                $("#user-changepassword-message").attr("class", "success-message");
            },
            error: function(xhr, status, error) {
                console.log("Change err::", xhr.responseText);
                var oldPassword = $('#user-changepassword-oldpassword').val();	
                var newPassword = $('#user-changepassword-newpassword').val();
                if(oldPassword.replace(/\s/g,"") == ""){
                	$("#user-changepassword-message").text("The Old Password is a Required Paramter So its can not be null or empty");
                }else if(newPassword.replace(/\s/g,"") == ""){
                	$("#user-changepassword-message").text("The New Password is a Required Paramter So its can not be null or empty");
                }else{
                	 $("#user-changepassword-message").text(xhr.responseText);
                }
               
                $("#user-changepassword-message").attr("class", "error-message");
            }
        });
    });
}





function account_update() {
  $("#btn-user-updateaccount").click(function () {
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
      success: function (res) {
        console.log("Update success::", res);
        $("#user-updateaccount-message").text("Account successfully updated.");
        $("#user-updateaccount-message").attr("class", "success-message");
        update_profile();
      },
      error: function (xhr, status, error) {
        console.log("Update err::", xhr.responseText);
        $("#user-updateaccount-message").text(xhr.responseText);
        $("#user-updateaccount-message").attr("class", "error-message");
      }
    });
  });
}









function logout() {
  $("#menu-logout").click(function () {
    $.ajax({
      type: "GET",
      url: "/logout",
      dataType: "json",
      data: $.param({
        token: localStorage.getItem("LRTokenKey")
      }),
      success: function (res) {
        localStorage.removeItem("LRTokenKey");
        localStorage.removeItem("lr-user-uid");
        window.location.href = "/";
      },
      error: function (xhr, status, error) {
        console.log("Logout err::", xhr.responseText);
      }
    });
  });
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
