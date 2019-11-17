$.ajax({
  type: "get",
  url: "/posts",
  success: function (response) {
    // console.log(response)
    //展示数据
    let html = template('postsTpl',response)
    // console.log(html);
    $('#postsBox').html(html); 
    //分页 
    let page = template('pageTpl', response)
    $('#page').html(page);
  }
});
//处理日期 的函数
function formData(params) {
  date = new Date(params);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}


//分页 的函数 
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/posts",
    data: {
      page: page,
    },
    success: function (response) {
      // console.log(response);
      let html = template('postsTpl',response)
      // console.log(html);
      $('#postsBox').html(html); 
      var page = template('pageTpl', response)
      $('#page').html(page);
    }
  });
}

// 向服务器端发送请求 索要分类数据
$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    // console.log(response);
    let html = template('categoryTpl', { data: response })
    // console.log(html);
    $('#categoryBox').html(html);
  }
});

$('#filterForm').on('submit',function () {
  var formData = $(this).serialize(); 
  $.ajax({
    type: "get",
    url: "/posts",
    data: formData,
    success: function (response) {
      var html = template('postsTpl', response);
      $('#postsBox').html(html);
      var page = template('pageTpl', response);
      $('#page').html(page);
    }
  });
  return false;
})

$('#postsBox').on('click','.delete',function() {
  let id = $(this).attr('data-id')
  $.ajax({
    type: 'delete', 
    url: `/posts/${id}`,
    success: function (response) {
      location.reload()
    }
  });
  return false;
})