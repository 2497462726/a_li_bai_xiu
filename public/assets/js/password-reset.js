$('#modifyForm').on('submit', function () {
  var data = $(this).serialize();
  // alert(data)
  $.ajax({
    type: "put",
    url: "/users/password",
    data,
    success: () => {
      // alert(1)
      location.assign('login.html')
    },
    error: () => {
      console.log('传输失败');
      
    }
  });
  return false;
})