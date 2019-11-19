let key = getUrlParams('key')
// alert(key) 
$.ajax({
  type: "get",
  url: `/posts/search/${key}`,
  success: function (response) {
    // console.log(response);
    let html = template('searchTpl',{data:response})
    $('#listBox').html(html)
  }
});