

var id = getUrlParams('categoryId')
// console.log(id); 

$.ajax({
  type: "get",
  url: `/posts/category/${id}`,
  success: function (response) {
    console.log(response);
    let html = template('listTpl', { data: response });
    // console.log(html);
    $('#listBox').html(html);
  }
});

$.ajax({
  type: "get",
  url: "/categories/"+id,
  success: function (response) {
    console.log(response);
    let html = response.title;
    // console.log(html);
    $('#titleBox').html(html);
  } 
});
