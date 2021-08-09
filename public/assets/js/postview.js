let soluong = 0;
let soluongbtn = 0;
let soluonghienthi = 0;
var sort;

$.ajax({
  url: "/post/view?page=0&view=0",
  type: "POST",
}).then(function (data) {
  soluong = data.data.data.length;
  $(".soluonghienthi").attr("value", soluong);
});

$(".capnhat").on("click", function capnhat() {
  var sort = document.getElementsByName("sort");
  for (var i = 0; i < sort.length; i++) {
    if (sort[i].checked === true) {
      sort = sort[i].value;
    }
  }
  $.ajax({
    url: "/post/view?page=0&view=0&sort=" + sort,
    type: "POST",
  })
    .then(function (data) {
      soluong = data.data.data.length;
      soluonghienthi = $(".soluonghienthi").val();
      $(".listbutton").html("");
      $(".data").html("");

      if (soluong < soluonghienthi) {
        $(".noti").html("khong du du lieu de hien thi");
      } else {
        $(".noti").html("");
        soluongbtn = Math.ceil(soluong / soluonghienthi);
        for (let i = 1; i <= soluongbtn; i++) {
          $(".listbutton").append(`<button class="btn ${i}">${i}</button>`);
        }

        for (let i = 0; i < soluonghienthi; i++) {
          function getauthor(handleData) {
            $.ajax({
              url: "/user/" + data.data.data[i]["author"],
              success: function (data) {
                handleData(data);
              },
            });
          }
          getauthor(function (author) {
            let delclass = `<button class="delete${i}">X</button>`;
            let append = `
            <div>
              ${data.data.role === "admin" ? delclass : ""}
              <p>id: ${data.data.data[i]["_id"]}</p>
              <p>Author: ${author}</p>
              <p>Date: ${new Date(data.data.data[i]["date"])}</p>
              <p>Title: ${data.data.data[i]["title"]}</p>
              <p>Content: ${data.data.data[i]["content"]}</p>
              <br>
            </div> 
            `;
            $(".data").append(append);

            $(`.delete${i}`).on("click", function () {
              $.ajax({
                url: "/post/delete",
                type: "delete",
                data: { id: data.data.data[i]["_id"] },
              }).then(function (data) {
                $(".noti").html(data.mess);
                $(`.delete${i}`).parent().remove();
              });
            });
          });
        }
      }
    })
    .catch(function (err) {
      $(".noti").html(err.mess);
    });
});

$("html").on("click", ".btn", function () {
  var page = $(this).attr("class").split(" ")[1] * 1;
  var sort = document.getElementsByName("sort");
  for (var i = 0; i < sort.length; i++) {
    if (sort[i].checked === true) {
      sort = sort[i].value;
    }
  }

  $.ajax({
    url:
      "/post/view?page=" + page + "&view=" + soluonghienthi + "&sort=" + sort,
    type: "POST",
  })
    .then(function (data) {
      $(".data").html("");
      for (let i = 0; i < soluonghienthi; i++) {
        function getauthor(handleData) {
          $.ajax({
            url: "/user/" + data.data.data[i]["author"],
            success: function (data) {
              handleData(data);
            },
          });
        }
        getauthor(function (author) {
          let delclass = `<button class="delete${i}">X</button>`;
          let append = `
        <div>
          ${data.data.role === "admin" ? delclass : ""}
          <p>id: ${data.data.data[i]["_id"]}</p>
          <p>Author: ${author}</p>
          <p>Date: ${new Date(data.data.data[i]["date"])}</p>
          <p>Title: ${data.data.data[i]["title"]}</p>
          <p>Content: ${data.data.data[i]["content"]}</p>
          <br>
        </div> 
        `;
          $(".data").append(append);
          $(`.delete${i}`).on("click", function () {
            $.ajax({
              url: "/post/delete",
              type: "delete",
              data: { id: data.data.data[i]["_id"] },
            }).then(function (data) {
              $(".noti").html(data.mess);
              $(`.delete${i}`).parent().remove();
            });
          });
        });
      }
    })
    .catch(function (err) {
      $(".noti").html(err.mess);
    });
});
