$(".button").on("click", function () {
  let username = $(".username").val();
  let oldpassword = $(".oldpassword").val();
  let newpassword = $(".newpassword").val();
  let confirm = $(".confirm").val();

  if (newpassword != confirm) {
    $(".noti").html("xac nhan password khac nhau");
  } else {
    $.ajax({
      url: "/changepass",
      type: "POST",
      data: { username, oldpassword, newpassword },
    })
      .then(function (data) {
        $(".noti").html(data.mess);
        window.location.href = "/user/signin";
      })
      .catch(function (err) {
        $(".noti").html(err);
      });
  }
});
