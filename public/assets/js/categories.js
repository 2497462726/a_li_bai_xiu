$('#addCategory').on('submit',function () {
  var data = $(this).serialize(); 
  // alert(data)
  $.ajax({
    type: "post",
    url: "/categories",
    data ,
    success: function (response) {
      location.reload();
    }
  });
  return false;
})

$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    var html = template('categoryListTpl', { data: response }); 
    $('#categoryBox').html(html);
  }
});
//修改
$('#categoryBox').on('click',".edit",function () {
  let id = $(this).attr('data-id')
  $.ajax({
    type: "get",
    url: `/categories/${id}`,
    success: function (response) {
      //  console.log(response);
      var html = template('modifyCategoryTpl',response)
      // console.log(html);
      $('#formBox').html(html);
    }
  });
})

$('#formBox').on('submit', '#modifyCategory', function () {
  var formData = $(this).serialize()
  let id = $(this).attr('data-id'); 
  // alert(id)
  $.ajax({
    type: "put",
    url: `/categories/${id}`,
    data:formData,
    success: function (response) {
      location.reload()
    }
  });
  return false; 
})

//删除  
$('#categoryBox').on('click', ".delete", function () {
  let id = $(this).attr('data-id'); 
  $.ajax({
    type: "delete",
    url: `/categories/${id}`,
    success: function (response) {
      location.reload()
    }
  });
  return false;
})
