//渲染
$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    // console.log(response);
    var html = template('categoryTpl', { data: response })
    $('#category').html(html)
  }
});
//上传图片
$('#feature').on('change',function () {
  var file = this.files[0]; 
  // console.log(file);
  var formData = new FormData(); 
  formData.append('cover', file); 
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // console.log(response); 
      $('#thumbnail').val(response[0].cover)
    }
  });
})

//提交整个表单 
$('#addForm').on('submit',function () {
  var formData = $(this).serialize(); 
  // console.log(formData);
$.ajax({
  type: "post",
  url: "/posts",
  data: formData,
  success: function () {
    location.href = '/admin/posts.html'
    // alert(1)
  }
});
  return false; 
})


// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
  console.log(name);
  console.log(location.search);
  var paramsAry = location.search.substr(1).split('&');
  console.log(paramsAry);
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return false;
}

// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != false) {
	// 根据id获取文章的详细信息
	$.ajax({
		type: 'get',
		url: '/posts/' + id,
		success: function (response) {
			$.ajax({
				url: '/categories',
				type: 'get',
				success: function (categories) {
					response.categories = categories;
					// console.log(response)
					var html = template('modifyTpl', response);
					$('#parentBox').html(html);
				}
			})
			
		}
	})
}

//修改后提交
$('#parentBox').on('submit','#modifyForm',function () {
  var formData = $(this).serialize()
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',
    url: '/posts/' + id,
    data: formData,
    success: () => {
      location.href = '/admin/posts.html';
    }
  })
  return false;
})

