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
  console.log(this.files[0]);
  let formData = new FormData(); 
  formData.append('avatar',this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false, 
    contentType: false,
    success: (response) => {
      console.log(response);
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
    $('#tbody').html(html)
  }
})