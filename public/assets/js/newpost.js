$(".upload").on("click", function () {
  let title = $(".title").val();
  let content = $(".content").val();
  $.ajax({
    url: "/post/new",
    type: "POST",
    data: {
      title: title,
      content: content,
    },
  })
    .then(function (data) {
      $(".noti").html(data.mess);
      window.location.href = "/post/view";
    })
    .catch(function () {
      $(".noti").html(err);
    });
});
