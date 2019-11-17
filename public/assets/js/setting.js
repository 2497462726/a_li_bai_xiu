$('#file').on('change', function () {
  let file = this.files[0];
  let formData = new FormData(); 
  formData.append('cover',file)
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // console.log(response);
      $('#logo').val(response[0].cover);
      $('img').attr('src', response[0].cover);
    }
  });
});



$('#settingsForm').on('submit',function () {
  let formData = $(this).serialize(); 
  $.ajax({
    type: "post",
    url: "/settings",
    data: formData,
    success: function (response) {
      // console.log(response);
      location.reload()
    }
  });
  return false; 
})

$.ajax({
  type: "get",
  url: "/settings",
  success: function (response) {
    // console.log(response);
    $('#img').attr('src', response.logo);
    $('#site_description').val(response.description);
    // 这里面是属性选择器   val是设置value值 
    $('input[name="title"]').val(response.title);
    $('input[name="keywords"]').val(response.keywords);
    //prop设置原有属性 attr都可以设置
    $('input[name="comment"]').prop('checked', response.comment);
    $('input[name="review"]').attr('checked',response.review)
  }
});