var id = getUrlParams('id');
var review; 
// console.log(id);
$.ajax({
  type: "get",
  url: `/posts/${id}`,
  success: function (response) {
    // console.log(response);
    let html = template('articleTpl', response)
    $('#articleBox').html(html);
  }
});

$('#articleBox').on('click','#like',function () {
  $.ajax({
    type: "post",
    url: "/posts/fabulous/"+id,
    success: function (response) {
      // console.log(response);
      // alert('点赞成功')
      // console.log(response.meta.likes);
      $('#likes').html(response.meta.likes)
    }
  });
})


$.ajax({
  type: "get",
  url: "/settings",
  success: function (response) {
    console.log(response);
    review = response.review 
    if (response.comment) {
      var html = template('commentTpl');
      // console.log(html);
      $('#comment').html(html);
    }
  }
});

$('#comment').on('submit','form', function () {
  // alert(1)
  let content = $(this).find('textarea').val();
  // alert(content)
  if (review) {
    state = 0;
  } else {
    state = 1; 
  }

  $.ajax({
    type: "get",
    url: "/comments",
    data: {
      content,
      post: id,
      state,
    },
    success: function () {
			alert('评论成功')
			location.reload();
		},
		error: function () {
			alert('评论失败')
		}
  });




  return false; 
});