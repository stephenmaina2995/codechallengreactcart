//UPDATE
// let url="http://localhost:3000/products";
//let options={
  //method:"PUT",
  //body: JSON.stringify(payload)
//}
// const product1={
//   id:'10',
//   price: '120',
// };

// fetch('http://localhost:3000/products',{
// method:"PUT",
// headers: {
// 'Content-Type': 'application/json'
// },
//   body: JSON.stringify(product1)
// }).then(!response => {
// if(!response.ok){
// console.log('Problem');
// return;
// }
// return response.json();
// }).then(data=> {
//   console.log('success');
// })
// .catch(error=>{
//   console.log(error);
// });
// fetch('http://localhost:3000/products', {
//   method: "PUT",
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(product1)
// }).then(response => {
//   if (!response.ok) {
//     console.log('Problem');
//     return;
//   }
//   return response.json();
// }).then(data => {
//   console.log('success');
// })
// .catch(error => {
//   console.log(error);
// });

//DELETE
// fetch('http://localhost:3000/products', {
//   method: "DELETE",
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(product1)
// }).then(response => {
//   if (!response.ok) {
//     console.log('Problem');
//     return;
//   }
//   return response.json();
// }).then(data => {
//   console.log('success');
// })
// .catch(error => {
//   console.log(error);
// });

//CREATE
const formElement = document.querySelector(".form");
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  // console.log(formData.get('productname'));
  // console.log(formData.get('price'));
  // console.log(formData.get('descrpition'));
  // console.log(formData.get('quantity'));
  // console.log(formData.get('img'));
  const data = Object.fromEntries(formData);
  // console.log(data);
  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
});
//READ
let product = [];

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((json) => {
    product = json;
    const categories = [...new Set(product.map((item) => item.category))];
    document.getElementById("root").innerHTML = categories
      .map((category) => {
        return product
          .filter((item) => item.category === category)
          .map((item, i) => {
            const { productname, price, img } = item;
            return `
              <div class='box'>
                <div class='img-box'>
                  <img class='images' src='${img}'></img>
                </div>
                <div class='bottom'>
                  <p>${productname}</p>
                  <h2>${price}</h2>
                  <p>${item.descrpition}</p>
                  <h3>${item.quantity}</h3>
                  <button onclick='addtocart(${i})'>Add To Cart</button>
                 
                </div>
              </div>
            `;
          })
          .join("");
      })
      .join("");
  })
  .catch((error) => console.error(error));

var cart = [];
//The first comment
//The second comment
//The third comment
function addtocart(a) {
  cart.push({ ...product[a] });
  displaycart();
}

function displaycart(a) {
  let j = 0;
  total = 0;
  price = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$" + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cart
      .map((item) => {
        var { productname, price, img } = item;

        total = parseInt(total) + parseInt(price);

        let display = document.getElementById("display");
        let totalprice = document.createElement("h4");
        totalprice.textContent = total;
        console.log(typeof total);

        //display.append(totalprice)
        document.getElementById("total").innerHTML = " " + total + ".00";
        return `
          <div class='cart-item'>
            <div class='row-img'>
              <img class='rowing' src=${img}>
            </div>
            <p style='font-size:12'>${productname}.</p>
            <h2 style='font-size:15px'>${price}</h2> 
            <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
          </div>`;
      })
      .join("");
  }
}

function delElement(a) {
  let product = [];

  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((json) => {
      product = json;
      const categories = [...new Set(product.map((item) => item.category))];
      document.getElementById("root").innerHTML = categories
        .map((category) => {
          return product
            .filter((item) => item.category === category)
            .map((item, i) => {
              const { productname, price, img } = item;
              return `
                <div class='box'>
                  <div class='img-box'>
                    <img class='images' src='${img}'></img>
                  </div>
                  <div class='bottom'>
                    <p>${productname}</p>
                    <h2>${price}</h2>
                    <p>${item.descrpition}</p>
                    <h3>${item.quantity}</h3>
                    <button onclick='addtocart(${i})'>Add To Cart</button>
                  </div>
                </div>
              `;
            })
            .join("");
        })
        .join("");
    })
    .catch((error) => console.error(error));

  var cart = [];

  function addtocart(a) {
    cart.push({ ...product[a] });
    displaycart();
  }

  function displaycart(a) {
    let j = 0;
    total = 0;
    price = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
      document.getElementById("cartItem").innerHTML = "Your cart is empty";
      document.getElementById("total").innerHTML = "Kshs" + 0 + ".00";
    } else {
      document.getElementById("cartItem").innerHTML = cart
        .map((item) => {
          var { productname, price, img } = item;
          total = parseInt(total) + parseInt(price);

          let display = document.getElementById("display");
          let totalprice = document.createElement("h4");
          totalprice.textContent = total;
          console.log(typeof total);

          //display.append(totalprice)
          document.getElementById("total").innerHTML = "Kshs " + total + ".00";
          return `
            <div class='cart-item'>
              <div class='row-img'>
                <img class='rowing' src=${img}>
              </div>
              <p style='font-size:12'>${productname}.</p>
              <h2 style='font-size:15px'>${price}</h2> 
              <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
            </div>`;
        })
        .join("");
    }
  }

  function delElement(a) {
    let product = [];

    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((json) => {
        product = json;
        const categories = [...new Set(product.map((item) => item.category))];
        document.getElementById("root").innerHTML = categories
          .map((category) => {
            return product
              .filter((item) => item.category === category)
              .map((item, i) => {
                const { productname, price, img } = item;
                return `
                  <div class='box'>
                    <div class='img-box'>
                      <img class='images' src='${img}'></img>
                    </div>
                    <div class='bottom'>
                      <p>${productname}</p>
                      <h2>${price}</h2>
                      <p>${item.descrpition}</p>
                      <h3>${item.quantity}</h3>
                      <button onclick='addtocart(${i})'>Add To Cart</button>
                    </div>
                  </div>
                `;
              })
              .join("");
          })
          .join("");
      })
      .catch((error) => console.error(error));

    var cart = [];

    function addtocart(a) {
      cart.push({ ...product[a] });
      displaycart();
    }

    function displaycart(a) {
      let j = 0;
      total = 0;
      price = 0;
      document.getElementById("count").innerHTML = cart.length;
      if (cart.length == 0) {
        document.getElementById("cartItem").innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$" + 0 + ".00";
      } else {
        document.getElementById("cartItem").innerHTML = cart
          .map((item) => {
            var { productname, price, img } = item;
            total = parseInt(total) + parseInt(price);

            let display = document.getElementById("display");
            let totalprice = document.createElement("h4");
            totalprice.textContent = total;
            console.log(typeof total);

            //display.append(totalprice)
            document.getElementById("total").innerHTML = " " + total + ".00";
            return `
              <div class='cart-item'>
                <div class='row-img'>
                  <img class='rowing' src=${img}>
                </div>
                <p style='font-size:12'>${productname}.</p>
                <h2 style='font-size:15px'>${price}</h2> 
                <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
              </div>`;
          })
          .join("");
      }
    }

    function delElement(a) {
      cart.splice(a, 1);
      displaycart();
    }
    cart.splice(a, 1);
    displaycart();
  }
  cart.splice(a, 1);
  displaycart();
}
//Delete function
function deleteProduct(id){

  console.log(`Hello World ${id}`)
  fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
          headers:{
            "Content-Type":"application/json"
          }
        })
  
}
//}
