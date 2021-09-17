'use strict';
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
function ready()
{
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(var i=0; i<removeCartItemButtons.length; i++) {
        var button= removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
            
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i=0; i< quantityInputs.length;i++)
    {
        var input =quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    var addToCartButtons =document.getElementsByClassName('shop-item-button')
    for(var i=0; i< addToCartButtons.length ;i++) {
        var button =addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}
function purchaseClicked()  {
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
function removeCartItem(event){
    var buttonClicked= event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

}
function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value<=0) {
        input.value=1
    }
    updateCartTotal()
}
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title ,price,imageSrc);
    updateCartTotal()
}
function addItemToCart(title,price,imageSrc)
{
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for(var i=0;i<cartItemNames.length;i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart ')
            return
        }
    }
    // const rowItem = document.querySelector(".cart-each-row-item");
    // const rowPrice = document.querySelector(".cart-each-row-price");
    // const rowQuantity = document.querySelector(".cart-each-row-quantity");
    var cartRowContents=`
    <div class="cart-row">
        <div class="cart-item cart-column">
            <img src="${imageSrc}"width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
            
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger cart-quantity-button" role="button">REMOVE</button>
        </div>
    </div>`
    // const cartImg = `
    // <div>
    //     <img src="${imageSrc}"width="100" height="100">
    //     <span class="cart-item-title">${title}</span>
    // </div>
    // `
    // const cartPrice = `<span class="cart-price cart-column">${price}</span>`;
    // const quantity = `<input class="cart-quantity-input" type="number" value="1">`;
    // rowItem.children[0].insertAdjacentHTML('afterend',cartImg);
    // rowPrice.children[0].insertAdjacentHTML('afterend',cartPrice);
    // rowQuantity.children[0].insertAdjacentHTML('afterend',quantity);
    cartRow.innerHTML =cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click' , removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
    updateCartTotal();
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows=cartItemContainer.getElementsByClassName('cart-row')
    var total=0
    for(var i=0; i<cartRows.length; i++) {
        var cartRow =cartRows[i]
        var priceElement=cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price =parseFloat(priceElement.innerText.replace('$',' '))
        var quantity = quantityElement.value
        console.log(price*quantity)
        total  = total+(price*quantity)

    }
    total=Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText='$' + total
}