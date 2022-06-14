let selBrands = []
let selCategory = []
let prods = []
let brands = []
let categories = []
let cart = []
let order = []
let sortOption=-1
getAPI().then(
  function(value){myfunction(value.products)}
);
function myfunction(val) {
    brands = val.reduce(function (acc,curr) {
        acc.find((ac) => ac == curr.brand) == undefined ?
        acc.push(curr.brand) : ""
        return acc}, [])
    categories=val.reduce(function (acc,curr) {
        acc.find((ac) => ac == curr.category) == undefined ?
        acc.push(curr.category) : ""
         return acc
         }, [])
    show(val)
}
function show(pr)
{
    prods =  pr

    const products1 = selBrands.length > 0 ?
        prods.filter((prod) => selBrands.findIndex((br) => br == prod.brand) >= 0):prods
    const products2 = selCategory.length > 0 ?
        products1.filter((prod) => selCategory.findIndex((cat) => cat == prod.category) >= 0):products1
    console.log(products2)
    let strRows = ""
    for (let i = 0; i < categories.length; i++)
    {
        let filt = products2.filter((prod) => prod.category == categories[i])
        let heading = filt.length == 0 ? "" : categories[i]
        let f=sortFn(filt)
        let proMap = '<div class="row">' + f.map(createColElement).join("") + '</div>'
        let html='<h4>'+heading+"</h4>"+proMap+'<br/><br/>'
        strRows += html
    }
    let str = makeNavBar() + '<br/>';
    str += '<div class="row bg-primary text-white font-weight-bold">'
    str += '<div class="col-sm-3 bg-secondary">Sort By</div>'
    str += '<div class="col-sm-3" onclick=sortCol(0)>Rating</div>'
    str += '<div class="col-sm-3" onclick=sortCol(1)>Discount</div>'
    str+='<div class="col-3" onclick=sortCol(2)>Price</div>'
    str+='</div ><br/> '
   
    let checkCat = makeCheckbox(categories, "cat", "Categories", selCategory, "")
    let checkBrand=makeCheckbox(brands, "brand", "Brands",selBrands, "")
    str += '<div class="row">'
    str += '<div class=" col-sm-2 bg-light">'+checkCat+'<br/>'+checkBrand+'</div>'
    str += '<div class=" col-sm-10  bg-light">'+strRows+'</div>'
    str += '</div>'
    document.getElementById("show").innerHTML = str
}
function sortFn(pr)
{
    switch (sortOption)
    {
        case 0:pr.sort((pr1, pr2) => pr1.rating - pr2.rating)
            break;
        case 1:pr.sort((pr1,pr2)=>pr1.discountPercentage-pr2.discountPercentage)
            break
        case 2: pr.sort((pr1, pr2) => pr1.price - pr2.price)
            break
        default:prods
    }
         return pr
}
function sortCol(num)
{
    sortOption = num
    show(prods)
}
function createColElement(pr, index)
{
    let st=pr.stock<50?"Hurry ! only a few items left":""
    let str = '<div class="col-xs-3 col-sm-6 ">'
    str += '<div class="row">'
    str += '<div class="col-6 ">'
    str+='<div class="row">'+'<img class="img-fluid" src="'+pr.thumbnail+'" style="height:100px"/>'+'</div>'
    str += '</div>'
    str += '<div class="col-6 ">'
    str += '<div class="text-danger font-weight-bold">' + pr.title + '</div>'
    str += '<div class="text-dark font-weight-bold">' + "Brand:" + pr.brand + '</div>'
    str+='<div id="warning" class="text-primary font-weight-bold">'+st+'</div>'
    str+='<div>'+pr.description+'</div>'
    str += '<div class="text-success font-weight-bold">' + "Price:" + pr.price + '</div>'
    str += '<div>' + "Rating:" + pr.rating + '</div>'
    str += '<div>' + "Discount:" + pr.discountPercentage + "%" + '</div>'
    str += '<div class="row">' + '<div class="col-6">' + '<button  class="btn btn-warning text-white font-weight-bold" onclick=addCart("' + pr.id + '")>Add  to Cart </button>' + '</div>' + '<div  class="col-6">' + '<button  id="order" class="btn btn-danger text-white font-weight-bold" onclick=orderIt("'+pr.id+'")> Order It </button > '+'</div > '+'</div > '
    str+='</div>'
    str+='</div>'
    str += '</div>'
   
    return str
}
 function addCart(index)
 {
     let findVal = prods.find(pr => pr.id == index)
     let cartfind = cart.find(pr => pr.id == index)
     if (cartfind != undefined)
     {
         cartfind.qty += 1
         cartfind.amount+=cartfind.price*cartfind.qty
     }
     else {
         let ord = { ...findVal }
         ord.qty = 1
         ord.amount = ord.qty * ord.price
         cart.push(ord)
     }
         
     alert("Your Product added to cart successfully")
   
   
    }
function orderIt(index)
{
    let findVal = prods.find(pr => pr.id == index)
    let orderFind = order.find(pr => pr.id == index)
    if (orderFind != undefined)
    {
        orderFind.qty += 1
        orderFind.amount+=orderFind.price*orderFind.qty
    }
    else {
        let ord = { ...findVal }
        ord.qty = 1
        ord.amount = ord.qty * ord.price
        order.push(ord)
    }
    alert("Product is ordered successfully. Check your my order for more details")
  }
 function checkedValues(elem)
 {
     if (elem.id == "cat") {
         if (elem.checked == true)
             selCategory.push(elem.value)
         else {
             let fn = selCategory.findIndex(s => s == elem.value)
             selCategory.splice(fn, 1)
         }
     }
         
     else if (elem.id == "brand") {
        if (elem.checked == true)
        selBrands.push(elem.value)
        else {
        let fn = selBrands.findIndex(s => s == elem.value)
        selBrands.splice(fn, 1)
    }
      }
        
     show(prods)
     
     
 }
 function makeNavBar()
    {
      let str= '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">';
          str+='<a class="navbar-brand" href="#">Shopping Spree</a>';
          str+='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">';
          str+'<span class="navbar-toggler-icon"></span>';
          str+='</button>';
     str += '<div class="collapse navbar-collapse" id="navbarNavAltMarkup">';
     str+= '<ul class="navbar-nav">';
       
          str+='<li class="nav-item  ">'; 
          str+='<a class="nav-link text-white" onclick="showCart()" >Cart</a>';
     str += '</li>';
     str+='<li class="nav-item  ">'; 
          str+='<a class="nav-link text-white" onclick="myOrder()" >My Order</a>';
     str += '</li>';
     str+='</ul>'
          str+='</div>';
          str+='</nav>';
     return str;
}
function myOrder()
{
    let arr1=order.map((item)=>
    {
        let {thumbnail,title,price,amount,discountPercentage,rating,stock,description,qty}=item
         let s1='<div class="col-12 border">';
           s1+='<div class="row">';
           s1+='<div class="col-6"><img class="img-fluid" src='+thumbnail+' style="height:100px"></div>';
           s1 += '<div class="col-6">';
           s1 += '<div class="text-danger font-weight-bold">' + "Number Of Items:" + qty + '</div><br/>';
           s1 += '<h5>' + title + '</h5>';
           s1 += '<div>' + description + '</div>';
           s1 += '<div>' + "Price:" + price + '</div>';
           s1 += '<div>' + "Stock:" + stock + '</div>';
           s1 += '<div>' + "Rating:" + rating + '</div>'
           s1 += '<div>' + "Discount:" + discountPercentage + "%" + '</div>'
           s1 += '<div class="text-dark font-weight-bold">' + "Total Amount:" + amount + '</div>'
           s1 += '<div class="row">' + '<span class="text-danger text-white font-weight-bold">Order Placed</span>'+'</div > <br/>'
           s1+='</div>';
           s1+='</div>';
           s1+='</div>';
           
           return s1;
    })
let str = arr1.join(" ")+'<br/><div class="row">'+'<button class="btn btn-success text-white font-weight-bold" onclick=home()>Back To Home </button>'+'</div>'
if (order.length == 0)
{
 let text = '<h5>' + "There is No Item in your Order." + '</h5>'
 str=text+str
}   
document.getElementById("show").innerHTML =makeNavBar()+ str
}
function showCart()
{
   
    let arr1=cart.map((item)=>
    {
        let {thumbnail,title,price,amount,discountPercentage,rating,stock,description,qty,id}=item
                    let st=item.stock<50?"Hurry ! only a few items left":""
                     let s1='<div class="col-12  border">';
                       s1+='<div class="row">';
                       s1+='<div class="col-6"><img class="img-fluid" src='+thumbnail+' style="height:100px"></div><br/><br/>';
                       s1 += '<div class="col-6">';
                       s1 += '<div class="text-danger font-weight-bold">' + "Number Of Items:" + qty + '</div>';
                       s1 += '<h5>' + title + '</h5>';
                       s1 += '<div  class="text-primary font-weight-bold">' + st + '</div>'
                       s1 += '<div>' + "Price:" + price + '</div>';
                       s1+='<div>'+description+'</div>';
                       s1 += '<div>' + "Stock:" + stock + '</div>';
                       s1 += '<div>' + "Rating:" + rating + '</div>'
                       s1 += '<div>' + "Discount:" + discountPercentage + "%" + '</div>'
                       s1 += '<div>' + "Total Amount:" + amount + '</div>'
                       s1 += '<div class="row">' + '<button   class="btn btn-danger text-white font-weight-bold" onclick=orderIt("' + id + '")> Order It </button > ' + '</div > <br/>'
                       s1 += '<div class="row">' + '<button   class="btn btn-success text-white font-weight-bold" onclick=remove("'+id+'")> Remove From Cart </button > '+'</div > <br/>'
                       s1+='</div>';
                       s1+='</div>';
                       s1+='</div>';
                       
                       return s1;
                })
    let str = arr1.join(" ")+'<br/><div class="row">'+'<button class="btn btn-success text-white font-weight-bold" onclick=home()>Back To Home </button>'+'</div>'
      if (cart.length == 0)
       {
        let text = '<h5>' + "There is No Item in your Cart." + '</h5>'
        str=text+str
    }     
    document.getElementById("show").innerHTML =makeNavBar()+ str
}
function remove(id)
{
    let removeId = cart.findIndex(c => c.id == id)
    cart.splice(removeId, 1)
    showCart();
}
function home()
{
    show(prods)
}
function makeCheckbox(arr,id,label,checkVal=[],err='')
    {
        
     let arr1=arr.map(opt=>
           {
               
               let findIn=checkVal.find(ch=>ch==opt);

               let checked=findIn!=undefined?'checked':'';
               let str='<div class="form-check form-check-inline">';
                   str+='<input type="checkbox" class="form-check-input" id="'+id+'" value="'+opt+'" '+checked+' onchange=checkedValues(this)>';
                   str+='<label class="form-check-label">'+opt+'</label>';
                 
                   str+='</div><br/>';
                return str;
           });
    let s1='<div class="form-check form-check-inline">';
        s1+='<label class="form-check-label">'+label+'</label>';
        s1+='</div><br/>';
        s1+=arr1.join("");
        s1+=err?'<br/><span class="text-danger">'+err+'</span>':'';
        return s1;
    }
    