$.ajax({
  url: "/user/checklogin",
  type: "POST",
}).then(function (data) {
  if (data.status == 200) {
    window.location.href = "/post/view";
  }
});

$(".button").on("click", function () {
  let username = $(".username").val();
  let password = $(".password").val();
  $.ajax({
    url: "/user/signup",
    type: "POST",
    data: {
      username: username,
      password: password,
    },
  })
    .then(function (data) {
      $(".noti").html(data.mess);
      window.location.href = "/post/view";
    })
    .catch(function (err) {
      $(".noti").html(err);
    });
});
