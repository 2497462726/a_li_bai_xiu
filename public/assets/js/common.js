  $('#logout').on('click',()=>{
    let isConfirm = confirm('确定退出')
    if(isConfirm){
      $.ajax({
        type:'post',
        url:'/logout',
        success:(data)=>{
          location.replace('login.html')
        },
        error:()=>{
          alert('退出失败')
        }
      })
    }
  })
//处理日期 的函数
function formData(params) {
  date = new Date(params);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}


let { nickName, avatar,_id } = JSON.parse(localStorage.getItem('user'))
$.ajax({
  type: "get",
  url: `/users/${_id}`,
  success: function (response) {
    $('.avatar').attr('src', response.avatar) 
    $('.profile .name').html(response.nickName)
  }
});

