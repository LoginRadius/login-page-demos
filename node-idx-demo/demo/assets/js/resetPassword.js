
let paramsObj = {};
if (params) {
  paramsObj = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
}

// make ajax request to the reset password API 

$("#btn-minimal-resetpassword").click(function () {
  $("#minimal-resetpassword-message").text("");

  if ($("#minimal-resetpassword-password").val() !== $("#minimal-resetpassword-confirmpassword").val()) {
    $("#minimal-resetpassword-message").text("Passwords do not match!");
    $("#minimal-resetpassword-message").attr("class", "error-message");
    return;
  }

  $.ajax({
    method: "POST",
    url: domainName + "/../ajax_handler/login",
    dataType: "json",
    data: $.param({
      password: $("#minimal-resetpassword-password").val(),
      resettoken: paramsObj.vtoken,
      action: "resetPassword"
    }),
    error: function (xhr) {
      $("#minimal-resetpassword-message").text(xhr.responseJSON).delay(2500).fadeOut(300);
      $("#minimal-resetpassword-message").attr("class", "error-message");
    }
  }).done(function (ret) {
    if (ret.status == "success") {
      $("#minimal-resetpassword-password").val("");
      $("#minimal-resetpassword-confirmpassword").val("");
      $("#minimal-resetpassword-message").text(ret.message).delay(2500).fadeOut(300);
      $("#minimal-resetpassword-message").attr("class", "success-message");
      setTimeout(function () { window.location.href = domainName; }, 5000);

    } else if (ret.status == "error") {
      $("#minimal-resetpassword-message").text(ret.message).delay(2500).fadeOut(300);
      $("#minimal-resetpassword-message").attr("class", "error-message");
    }
  });
});


