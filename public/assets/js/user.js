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
//删除数据 
$('#userBox').on('click','.delete',function () {
  let id = $(this).attr('data-id'); 
  // console.log(id); 
  if (confirm('确定删除')) {
    $.ajax({
      type: "delete",
      url: `/users/${id}`,
      success: () => {
        location.reload()
      }
    });
  }
  
})
//批量删除 
//单复选框
let selectAll = $('#selectAll');
selectAll.on('change',function () {
  let status = $(this).prop('checked') 
//  alert(status)
  $('#userBox').find('input').prop('checked', status);
  //批量删除按钮的显示隐藏
  if (status) {
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();
  }
})

$('#userBox').on('change','.userStatus',function () {
  // alert(1)
  let inputs = $('#userBox').find('input'); 
  // console.log(inputs);
  if (inputs.length === inputs.filter(':checked').length) {
    selectAll.prop('checked', true);
  } else {
    selectAll.prop('checked', false);
  }
  //批量删除按钮的显示隐藏
  if (inputs.filter(':checked').length > 0) {
    $('#deleteMany').show();
  } else {
    $('#deleteMany').hide();
  }
})
//实现批量删除
$('#deleteMany').on('click',function () {
  var checkedUser = $('#userBox').find('input').filter(':checked') 
  // console.log(checkedUser);
  var ids = []; 
  checkedUser.each(function (index, item) {
    // console.log($(item).attr('data-id'));
    ids.push($(item).attr('data-id')) //注意这里的item是原生js需要转换为jquery  其次需要在对应的input里面添加data-id
    //原生 dataset.id
  });
  console.log(ids); 

  if (confirm('确定批量删除')) {
    $.ajax({
      type: 'delete',
      url: `/users/${ids.join('-')}`,
      success: () => {
        location.reload()
      }
     })
   }



})