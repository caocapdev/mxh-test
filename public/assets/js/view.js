let soluong = 0;
let soluongbtn = 0;
let soluonghienthi = 0;

$(".capnhat").on("click", function capnhat() {
  $.ajax({
    url: "/view?page=0&view=0",
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
        soluongbtn = Math.ceil(soluong / soluonghienthi);
        for (let i = 1; i <= soluongbtn; i++) {
          $(".listbutton").append(`<button class="btn ${i}">${i}</button>`);
        }

        for (let i = 0; i < soluonghienthi; i++) {
          let delclass = `<button class="delete${i}">X</button>`;
          let append = `
            <div>
              ${data.data.role === "admin" ? delclass : ""}
              <p>id: ${data.data.data[i]["_id"]}</p>
              <p>username: ${data.data.data[i]["username"]}</p>
              <br>
            </div> 
            `;
          $(".data").append(append);

          $(`.delete${i}`).on("click", function () {
            $.ajax({
              url: "/delete",
              type: "delete",
              data: { id: data.data.data[i]["_id"] },
            }).then(function (data) {
              $(".noti").html(data.mess);
              $(`.delete${i}`).parent().remove();
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

  $.ajax({
    url: "/view?page=" + page + "&view=" + soluonghienthi,
    type: "POST",
  })
    .then(function (data) {
      $(".data").html("");
      for (let i = 0; i < soluonghienthi; i++) {
        let delclass = `<button class="delete${i}">X</button>`;
        let append = `
        <div">
          ${data.data.role === "admin" ? delclass : ""}
          <p>id: ${data.data.data[i]["_id"]}</p>
          <p>username: ${data.data.data[i]["username"]}</p>
          <br>
        </div>
        `;
        $(".data").append(append);
        $(`.delete${i}`).on("click", function () {
          $.ajax({
            url: "/delete",
            type: "delete",
            data: { id: data.data.data[i]["_id"] },
          }).then(function (data) {
            $(".noti").html(data.mess);
            $(`.delete${i}`).parent().remove();
          });
        });
      }
    })
    .catch(function (err) {
      $(".noti").html(err.mess);
    });
});
