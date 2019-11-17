$.ajax({
  type: "get",
  url: "/comments",
  success: function (response) {
    // console.log(response);
    let html = template('commentsTpl', response); 
    // console.log(html);
    $('#commentsBox').html(html);
    let pageHtml = template('pageTpl', response); 
    $('#pageBox').html(pageHtml);
  }
});

function changePage(page) {
  $.ajax({
    type: "get",
    url: "/comments",
    data: {
      page:page,
    },
    success: function (response) {
      // console.log(response);
      let html = template('commentsTpl', response); 
      // console.log(html);
      $('#commentsBox').html(html);
      let pageHtml = template('pageTpl', response); 
      $('#pageBox').html(pageHtml);
    }
  });
  
}

$('#commentsBox').on('click','.status',function () {
  let status = $(this).attr('data-status'); 
  let id = $(this).attr('data-id');
  // alert(status)
  // alert(id)
  $.ajax({
    type: "put",
    url: `/comments/${id}`,
    data: {
      state:status==0 ? '1':'0',
    },
    success: function (response) {
      location.reload()
    }
  });
})
$('#commentsBox').on('click', '.delete', function () {
  let id = $(this).attr('data-id');
  $.ajax({
    type: "delete",
    url: `/comments/${id}`,
    success: function (response) {
      location.reload()
    }
  });
})