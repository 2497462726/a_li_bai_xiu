//渲染
$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    // console.log(response);
    var html = template('categoryTpl', { data: response })
    $('#category').html(html)
  }
});
//上传图片
$('#feature').on('change',function () {
  var file = this.files[0]; 
  // console.log(file);
  var formData = new FormData(); 
  formData.append('cover', file); 
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // console.log(response); 
      $('#thumbnail').val(response[0].cover)
    }
  });
})

//提交整个表单 
$('#addForm').on('submit',function () {
  var formData = $(this).serialize(); 
  // console.log(formData);
$.ajax({
  type: "post",
  url: "/posts",
  data: formData,
  success: function () {
    location.href = '/admin/posts.html'
    // alert(1)
  }
});
  return false; 
})