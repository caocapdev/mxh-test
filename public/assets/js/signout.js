$(".signout").on("click", function () {
  $.ajax({
    url: "/user/signout",
    type: "POST",
    data: { cookies: document.cookie },
  }).then(function (data) {
    document.cookie =
      "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    $(".noti").html(data.mess);
    window.location.href = "/user/signin";
  });
});

$(".signoutall").on("click", function () {
  $.ajax({
    url: "/user/signoutall",
    type: "POST",
  })
    .then(function (data) {
      $(".noti").html(data.mess);
      window.location.href = "/user/signin";
    })
    .catch(function (err) {
      $(".noti").html(err.mess);
    });
});
