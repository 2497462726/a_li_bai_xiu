
$('#file').on('change', function () {
  let file = this.files[0];
  // console.log(this);
  let formData = new FormData();
  formData.append('cover', file);
  // alert(1)
  $.ajax({
    type: "post",
    url: "/upload",
    data:formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // console.log(response);
      // console.log(response[0].cover);
      $('#image').val(response[0].cover)
    }
  });
})

$('#slidesForm').on('submit',function () {
  let formData = $(this).serialize(); 
  $.ajax({
    type: "post",
    url: "/slides",
    data: formData,
    success: function (response) {
      location.reload()
    }
  });
  return false;
})

$.ajax({
  type: "get",
  url: "/slides",
  success: function (response) {
    // console.log(response);
    let html = template('slidesTpl', { data: response })
    // console.log(html);
    $('#slidesBox').html(html);
  }
});

$('#slidesBox').on('click','.delete',function () {
  let id = $(this).attr('data-id'); 
  $.ajax({
    type: "delete",
    url: `/slides/${id}`,
    success: function (response) {
      location.reload();
    }
  });
  return false;
})