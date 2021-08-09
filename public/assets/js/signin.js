function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$.ajax({
  type: "POST",
  url: "/user/checklogin",
})
  .then(function (data) {
    $(".noti").html(data.mess);
    if (data.status == 200) {
      window.location.href = "/post/view";
    }
  })
  .catch(function (err) {
    res.json(err);
  });

$(".button").on("click", function () {
  let username = $(".username").val();
  let password = $(".password").val();
  $.ajax({
    url: "/user/signin",
    type: "POST",
    data: { username: username, password: password },
  })
    .then(function (data) {
      if (data.status == 200) {
        setCookie("token", data.data);
        window.location.href = "/post/view";
      }
      $(".noti").html(data.mess);
    })
    .catch(function (err) {
      $(".noti").html(err);
    });
});
