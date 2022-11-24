let modalform = document.getElementsByClassName('modal-bg')[0];

let cart = [];



document.onclick = event => {
    if (event.target == modal) {
        modalform.style.display = "none";
    } else if (event.target.classList.contains('modal-close')) {
        modalform.style.display = "none";
    } else if (event.target.classList.contains('checkout-img')) {
        if (cart.length > 0) {
            modalform.style.display = "block";
        } else { alert('Сначала выберите товар!') }
    } else if (event.target.classList.contains('item-checkout')) {
        PlusFunction(event.target.dataset.id);
    } else if (event.target.classList.contains('delete-item-arrow')) {
        MinusFunction(event.target.dataset.id);
    }

}


const PlusFunction = id => {
    let items = document.getElementsByClassName('item');

    cart[cart.length] = {
        "Name": 'ugly from young ' + items[id - 1].querySelector('.fit').textContent,
        "Size": items[id - 1].getElementsByClassName("dropdown")[0].options[items[id - 1].getElementsByClassName("dropdown")[0].options.selectedIndex].value
    };
    const product = document.getElementsByClassName('item');
    const productImage = product[id-1].querySelector('.item-img');
    const cartIcon = document.querySelector('.checkout-img');

    const productImageFly = productImage.cloneNode(true);

    const productImageFlyWidth = productImage.offsetWidth;
    const productImageFlyHeight = productImage.offsetHeight;
    const productImageFlyTop = productImage.getBoundingClientRect().top;
    const productImageFlyLeft = productImage.getBoundingClientRect().left;
    console.log(productImageFlyWidth);
    console.log(productImageFlyTop);

    productImageFly.setAttribute('class', '_flyImage');
    productImageFly.style.cssText = `
    left: ${(productImageFlyLeft)}px;
    top: ${(productImageFlyTop)}px;
    width: ${(productImageFlyWidth)}px;
    height: ${(productImageFlyHeight)}px;
    `;
    document.body.append(productImageFly);
    const cartFlyLeft = cartIcon.getBoundingClientRect().left;
    const cartFlyTop = cartIcon.getBoundingClientRect().top;

    productImageFly.style.cssText = `
    left: ${(cartFlyLeft)}px;
    top: ${(cartFlyTop)}px;
    width: 0px;
    height: 0px;
    opacity:0;
    `;
    RenderCart();
}

const MinusFunction = id => {
    cart.splice(id, 1);
    RenderCart();
}

const list = document.querySelector('.list'),
    items = document.querySelectorAll('.fit')
    listItems = document.querySelectorAll('.fit')

function filter() {
    list.addEventListener('click', event => {
        const targetId = event.target.dataset.id
        
        listItems.forEach(listFit => listFit.classList.remove('active'))

        switch(targetId) {
            case 'all':
            getItems('fit')  
                break
            case 'regular-fit':
            getItems(targetId)
                break
            case 'oversize-fit':
            getItems(targetId)
                break

        }
    })
}
filter()

function getItems(className) {
    items.forEach(item =>{
        if(item.classList.contains(className)) {
            item.style.display = 'block'
        }else {
                item.style.display = 'none'
            }
      })
}




const RenderCart = () => {
    console.log(cart);
    let CountCart = document.querySelector(".checkout-text");
    CountCart.textContent = cart.length;

    let ModalCart = document.querySelector(".item-info-wrapper");
    if (cart.length > 0) {
        ModalCart.innerHTML = '';
        document.querySelector('.order-price').textContent = 4000 * cart.length + ' rub';
        cart.forEach(function (item, i, arr) {
            ModalCart.innerHTML =
                ModalCart.innerHTML + '<div class="item-info"><img src="./img/tshirt.svg" class="modal-img" /><img src="./img/close.svg" data-id=' + i + ' class="delete-item-arrow" /><div class="modal-info-wrap"><h2 class="modal-info-name">' + item["Name"] + '</h2><div class="modal-info-size-wrap"><h3 class="modal-info-size">Размер</h3><h2 class="modal-size">' + item["Size"] + '</h2></div></div></div>';
        });
    } else {
        ModalCart.innerHTML = '<div class="empty-cart">Корзина пуста</div>'
        document.querySelector('.order-price').textContent = '0 rub';
    }
}

