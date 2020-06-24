
let paramsObj = {};
if (params) {
  paramsObj = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
}


// make ajax request to the reset password API 


$("#btn-minimal-resetpassword").click(function () {
  $("#minimal-resetpassword-message").text("");

  if ($("#minimal-resetpassword-password").val() !== $("#minimal-resetpassword-confirmpassword").val()) {
    $("#minimal-resetpassword-message").text("Passwords do not match!").delay(2500).fadeOut(300);
    $("#minimal-resetpassword-message").attr("class", "error-message");
    return;
  }

  let data = {
    "password": $("#minimal-resetpassword-password").val(),
    "resettoken": paramsObj.vtoken
  };

  $.ajax({
    method: "PUT",
    data: JSON.stringify(data),
    url: serverUrl + "/login/resetpassword",
    contentType: "application/json",
    error: function (xhr) {
      let errorMessage;
      if (xhr.responseJSON) {
        errorMessage = xhr.responseJSON.Description;
      } else {
        errorMessage = xhr.statusText;
      }
      $("#minimal-resetpassword-message").text(errorMessage);
      $("#minimal-resetpassword-message").attr("class", "error-message");
    }
  }).done(function (res) {
    $("#minimal-resetpassword-password").val("");
    $("#minimal-resetpassword-confirmpassword").val("");
    $("#minimal-resetpassword-message").text(res.message).delay(2500).fadeOut(300);
    $("#minimal-resetpassword-message").attr("class", "success-message");
    setTimeout(function () { window.location.href = domainName; }, 5000);
  });
});


