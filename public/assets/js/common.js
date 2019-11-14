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
