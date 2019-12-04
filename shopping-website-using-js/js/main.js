function myfun() {
    var pro = '<div class="row">';
    for (var i = 0; i < products.length; i++) {
        pro += '<div class="col-md-3 col-sm-2 py-5"   >';
        pro += '<div class="product-grid6">';
        pro += '<div class="product-image6">';
        pro += '<a onClick="details(products[i].Id)">';
        pro += '<img class="pic-1" src="' + products[i].Image + '" >';
        pro += '</a>';
        pro += '</div>';
        pro += '<div class="product-content">';
        pro += '<h3 class="title">' + products[i].Name + '</h3>';
        pro += '<p >' + products[i].Description + products[i].Id + '</p>';
        pro += '<div class="price">CAD' + products[i].Price;
        pro += '</div>';
        pro += '</div>';
        pro += '<ul class="social">';
        pro += '<li><a onclick="addtocart(' + products[i].Id + ')" data-tip="Add to cart" ><i class="fa fa-shopping-cart"></i></a></li>';
        pro += '</ul>';
        pro += '</div>';
        pro += '</div>';

    }
    pro += ' </div>';
    document.getElementById("items").innerHTML = pro;
    document.getElementById("cart").innerHTML = JSON.parse(localStorage.getItem("cart")).length;
}


function addtocart(id) {
    var found = false;
    cart=JSON.parse(localStorage.getItem("cart"));
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].Id == id) {
            found = true;
            break;
        }
    }
    if (found) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].Id == id) {
                cart[i].Quantity++;
                console.log(cart);
                break;
            }
        }
    }
    else {
        var result = products.filter(obj => {
            return obj.Id === id
        })
        console.log(result);
        var obj = {
            Id: result[0].Id,
            Price: result[0].Price,
            Quantity: 1,
            Shipping: result[0].Cost
        }
        cart.push(obj);
        console.log(cart);

   }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem("cart")));
    document.getElementById("cart").innerHTML = JSON.parse(localStorage.getItem("cart")).length;

}

function mycart() {
    var pro = '';
    var itemm = JSON.parse(localStorage.getItem("cart"));
    var avial; var sub=0,ship = 0;
    var len = JSON.parse(localStorage.getItem("cart")).length;
    for (var i = 0; i < len; i++) {
        var result = products.filter(obj => {
            return obj.Id === itemm[i].Id;
        })
        if (result[0].Max > 0) {
            avial = "In Stock";
        }
        else
            avial = "Out of Stock";
        pro += '<tr >';
        pro += '<td class="text-center"><img src="' + result[0].Image + '" style="width:30px" /> </td>';
        pro += '<td class="text-center">' + result[0].Name + '</td>';
        pro += '<td class="text-center">' + avial + '</td>';
        pro += '<td></td>'
        // pro += ' <td class="text-center px-0"><button class="btn btn-sm btn-info" onclick="increase('+itemm[i].Id+')"><i class="fa fa-plus" aria-hidden="true"></i></button></td>';
        pro += '<td class="text-center">' + itemm[i].Quantity + '</td>';
        // pro += '<td class="text-center px-0"><button class="btn btn-sm btn-info" onclick="descrease('+itemm[i].Id+')"><i class="fa fa-minus" aria-hidden="true"></i></button></td>';
        pro += '<td></td>'
        pro += ' <td class="text-center">' + itemm[i].Quantity * itemm[i].Price + '</td>';
        pro += '<td class="text-center"><button class="btn btn-sm btn-danger" onclick="deleteproduct('+itemm[i].Id+')"><i class="fa fa-trash"></i></button> </td>';
        pro += '</tr>';
        document.getElementById("ship").value = itemm[i].Shipping;
        sub += itemm[i].Quantity * itemm[i].Price;
        ship+=itemm[i].Shipping;
        document.getElementById("subtotal").innerHTML = sub;

    }

    document.getElementById("shop").innerHTML = pro;
    document.getElementById("total").innerHTML = sub+ship;
    document.getElementById("ship").innerHTML = ship;
}

function filters(cat){
    console.log(cat);
    if(cat=='All'){
        myfun();
    }
    else{
    var result = products.filter(obj => {
        return obj.Category === cat
    })
    console.log(result);
    var pro = '<div class="row">';
    for (var i = 0; i < result.length; i++) {
        pro += '<div class="col-md-3 col-sm-2 py-5"   >';
        pro += '<div class="product-grid6">';
        pro += '<div class="product-image6">';
        pro += '<a onClick="details(result[i].Id)">';
        pro += '<img class="pic-1" src="' + result[i].Image + '" >';
        pro += '</a>';
        pro += '</div>';
        pro += '<div class="product-content">';
        pro += '<h3 class="title">' + result[i].Name + '</h3>';
        pro += '<p >' + result[i].Description + result[i].Id + '</p>';
        pro += '<div class="price">CAD' + result[i].Price;
        pro += '</div>';
        pro += '</div>';
        pro += '<ul class="social">';
        pro += '<li><a onclick="addtocart(' + result[i].Id + ')" data-tip="Add to Cart" ><i class="fa fa-shopping-cart"></i></a></li>';
        pro += '</ul>';
        pro += '</div>';
        pro += '</div>';

    }
    pro += ' </div>';
    document.getElementById("items").innerHTML = pro;
    
}
document.getElementById("cart").innerHTML = JSON.parse(localStorage.getItem("cart")).length;
}

// function increase(id){
//     var c=JSON.parse(localStorage.getItem("cart"))
//     console.log(c);
    
//     mycart();
// }

// function descrease(id){
//     var c=JSON.parse(localStorage.getItem("cart"))
//     console.log(c);
    
//     mycart();
// }

function deleteproduct(id){
    var c=JSON.parse(localStorage.getItem("cart"))
    var i=c.findIndex(x => x.Id ===id)
    console.log(i)
    c.splice(i, 1)
    localStorage.setItem("cart", JSON.stringify(c));
    mycart();
}










var products = [
    {
        Id: 1,
        Name: "Shoes",
        Price: 53.99,
        Qty: 50,
        Max: 10,
        Category: "footwear",
        Cost: 5,
        Reviews: ["good", "osm product", "i loved it so much"],
        Description: "Boots Snow Sneakers Men Women Shoes Outdoor Winter Ankle Fur Lined Warm Waterproof Bootie",
        Image: "../img/boot1.jpg"
    },
    {
        Id: 2,
        Name: "Echo Dot",
        Price: 35.55,
        Qty: 20,
        Max: 100,
        Category: "Gadgets",
        Cost: 5,
        Reviews: ["good", "osm product", "i loved it so much"],
        Description: "Our most popular smart speaker - Now with a fabric design and improved speaker for richer and louder sound.",
        Image: "../img/speakr.jpg"
    },
    {
        Id: 3,
        Name: "Sweatshirt Hoodie",
        Price: 38.34,
        Qty: 15,
        Max: 100,
        Category: "clothes",
        Cost: 0,
        Reviews: ["good", "osm product", "i loved it so much"],
        Description: "Smallshow Women's Fleece Maternity Nursing Sweatshirt Hoodie with Kangaroo Pocket",
        Image: "../img/cloth.jpg"
    },
    {
        Id: 4,
        Name: "Sweatshirt Hoodie",
        Price: 38.34,
        Qty: 15,
        Max: 100,
        Category: "clothes",
        Cost: 0,
        Reviews: ["good", "osm product", "i loved it so much"],
        Description: "Smallshow Women's Fleece Maternity Nursing Sweatshirt Hoodie with Kangaroo Pocket",
        Image: "../img/cloth.jpg"
    }
    , {
        Id: 5,
        Name: "Sweatshirt Hoodie",
        Price: 38.34,
        Qty: 15,
        Max: 100,
        Category: "clothes",
        Cost: 0,
        Reviews: ["good", "osm product", "i loved it so much"],
        Description: "Smallshow Women's Fleece Maternity Nursing Sweatshirt Hoodie with Kangaroo Pocket",
        Image: "../img/cloth.jpg"
    }

]


var cart = [];

