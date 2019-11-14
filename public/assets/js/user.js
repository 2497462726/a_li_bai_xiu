$('#userForm').on('submit',function () {
  let userForm =$(this).serialize()
  //  console.log(userForm)
  $.ajax({
    type:'post',
    url:'/users',
    data:userForm ,
    success:()=>{
      location.reload(); 
    },
    error:()=>{
      alert('添加用户失败')
    }
  })

  return false ;
})
$('#modifyBox').on('change','#avatar',function () {
  // console.log(this.files[0]);
  let formData = new FormData(); 
  formData.append('avatar',this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false, 
    contentType: false,
    success: (response) => {
      // console.log(response);
      $('#preview').attr('src', response[0].avatar);
      $('#hiddenAvatar').val( response[0].avatar)
    }
  })
  
})


$.ajax({
  type: 'get',
  url: '/users',
  success: (response) => {
    // console.log(response);
    var html = template('userTpl', { data: response })
    $('#userBox').html(html)
  }
})
//用户修改
$('#userBox').on('click','.edit',function () {
  let id = $(this).attr('data-id')
  $.ajax({
    type: "get",
    url: `/users/${id}`,
    success: (data) => {
      // console.log(data);
      let html = template('modifyTpl', data)
      $('#modifyBox').html(html)
    }
  });
})
//用户修改之后提交
$('#modifyBox').on('submit','#userForm',function () {
  // alert(1)
  let id = $(this).attr("data-id");
  // console.log(id);
  var data = $(this).serialize();
  $.ajax({
    type: "put",
    url: `/users/${id}`,
    data ,
    success: function (response) {
      // console.log(1);
      location.reload()
    },
    error: () => {
      console.log('修改上传错误');
    }
    
  });
  return false ;
})
