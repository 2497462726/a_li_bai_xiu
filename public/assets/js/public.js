$.ajax({
  type: "get",
  url: "/posts/random",
  success: function (response) {
    // console.log(response);
    let randomTpl = `
    {{each response}}
    <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title"></p>{{$value.content}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
    `;
    let html = template.render(randomTpl, { response })
    $('#randomBox').html(html)
  }
});

//处理日期 的函数
function formData(params) {
  date = new Date(params);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

$.ajax({
  type: "get",
  url: "/comments/lasted",
  success: function (response) {
    // console.log(response);
    let commentsTpl = `
    {{each data}}
    <li>
            <a href="detail.html?id={{$value._id}}">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formData($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
      {{/each}}
    `;
    let html = template.render(commentsTpl,{data:response})
    $('#commentsBox').html(html)
  }

});

$.ajax({
  type: "get",
  url:'categories',
  success: function (response) {
    // console.log(response);
    let navTpl = `
    {{each response}}
    <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value. title}}</a></li>
    {{/each}}
    `;
    let html = template.render(navTpl, { response });
    // console.log(html);
    $('#navBox').html(html);
    $('#nav_Box').html(html);

  }
});

function getUrlParams(name) {
  // console.log(name);
  // console.log(location.search);
  var paramsAry = location.search.substr(1).split('&');
  // console.log(paramsAry);
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return false;
}

$('.search form').on('submit',function () {
  let data = $(this).find('.keys').val();
  location.href = '/search.html?key=' + data;
  return false; 
})