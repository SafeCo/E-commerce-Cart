
let products = {

	fetchShop : function(){
		fetch('./item.json')
        .then(res=>res.json())
        .then(data => this.sortButton(data))
     },

  sortButton: function(data){  
  const loading = document.querySelector('.loading')
  const itemInsert = document.querySelector('.item-insert')
  loading.classList.add("test")
  itemInsert.style.visibility = "hidden"

  let counter = 0
  if (counter == 0 ) {
    this.priceFilter(data.sort(this.sortRating))
  
    const dropDown = document.querySelector('#dropdown')
    dropDown.addEventListener('change', function(){
        products.sortData(data, dropDown.value)
      })
    const slider = document.querySelector('#price-range');
    const display = document.querySelector('.display-range')
    slider.addEventListener('change', function(){
      display.innerHTML = '£1 - £' + this.value
      products.sortData(data, dropDown.value)
      })

    const modalInsert = document.querySelector('.modal-item-insert')
    modalInsert.addEventListener('click', function(e){
      if(e.target.classList[0] != 'button'){
        return
      }
      let quantity = e.target.parentElement.children[1]
      let orgPrice = e.target.parentElement.parentElement.children[4].getAttribute('data-price')
      const price = e.target.parentElement.parentElement.children[4]
      let deleteModal = e.target.getAttribute("data-delete")
      let total = 0
      let grandTotal = 0

      if(e.target.innerText == '+'){
          quantity.innerText++
          total =  orgPrice * quantity.innerText
          total = Math.round(total*100)/100
          price.innerText= "£" + total.toFixed(2)
          products.sortModalPrice() 

        }else if (e.target.innerText == '-' && quantity.innerText != '1'){
          quantity.innerText--
          total =  orgPrice * quantity.innerText
          total = Math.round(total*100)/100
          price.innerText= "£" + total.toFixed(2)
          products.sortModalPrice() 
        }else if(deleteModal == "modal-delete"){
          e.target.parentElement.parentElement.remove()
          const basketNumber = document.querySelector(".basket-number")
          basketNumber.innerText--
          products.sortModalPrice() 
        }
      })
        
        const basket = document.querySelector('#basket')
        const modal = document.querySelector('.modal')
        const overlay = document.querySelector('.overlay')
        const closeModal = document.querySelector('.close-button')

        basket.addEventListener("click", function() {
          modal.classList.toggle('active')
          overlay.classList.toggle('active')
        })

        closeModal.addEventListener("click", function(){
          modal.classList.toggle('active')
          overlay.classList.toggle('active')
        })

        const search = document.querySelector('.search-bar')

        search.addEventListener('submit', function(e){
          e.preventDefault()
        })

    
    }
  },

  sortModalPrice:function(){
    const modalInsert = document.querySelector('.modal-item-insert')
    const modalGrandTotal = document.querySelector('.modal-total')
   
    let total = 0
    for(i = 0; i < modalInsert.children.length; i++){
      let modalItemTotal = modalInsert.children[i].children[4]
      let x = modalItemTotal.innerText.substring(1)
      total += parseFloat(x)
    }
    let grandTotal = Math.round(total*100)/100
    modalGrandTotal.innerText = 'Total Price: £' + grandTotal.toFixed(2)
  },

  sortData: function(data, value){
    if(value == 1){
      this.priceFilter(data.sort(this.sortRating))
    }else if(value == 2){
      this.priceFilter(data.sort(this.sortAlphabet))
    }else if(value == 3){
      this.priceFilter(data.sort(this.sortHToLPrice))
    }else if (value ==4) {
      this.priceFilter(data.sort(this.sortLToHPrice))
    }
        
  },

  sortAlphabet: function( a, b){
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    if (titleA < titleB){
      return -1;
    }
    if (titleA > titleB) {
      return 0
    }

  },

  sortLToHPrice: function( a, b){
    return a.price - b.price;
  },

  sortHToLPrice: function( a, b){
    return b.price - a.price;
  },

  sortRating: function( a, b){
    return b.rating.rate - a.rating.rate;
  },

  priceFilter: function(data){
    const slider = document.querySelector('#price-range');
    const display = document.querySelector('.display-range')
    display.innerHTML = '£1 - £' + slider.value
    let result = data.filter(sortIt)
    
    function sortIt(data){
       return data.price <= slider.value
      }
  
    products.displayShop(result)

   },


    titleCorrection: function (string){
        if(string.length <= 60){
            return string.substring(0 , 60) 
          }else if (string.length >= 61){
            return string.substring(0 , 60) + '...'
          }
    },

   displayShop: function(data){
   	    let containerFour = document.querySelector('.item-insert');
        containerFour.innerHTML = ""
        for (var i=0; i < data.length; i++) {
          let title = this.titleCorrection(data[i].title)
          let price = data[i].price
          let oldPrice = price * 2;
          let image = data[i].image;
          let id = data[i].id
          containerFour.innerHTML += 
          `<div class='item'>
            <div class='image'>
                <img class='item-image' src='${ image }'>
            </div>
            <p class='html-title'>${ title }</p>
            <p class='html-old-price'>£${ oldPrice }</p>
            <p class='html-new-price'>£${ price }</p>
            <button class='add-to-basket' data-id='${id}' >Add</button>                 
          </div>`
        }
        this.sortButton.counter = 1;

        const loading = document.querySelector('.loading')
        const itemInsert = document.querySelector('.item-insert')
        loading.classList.remove("test")
        itemInsert.style.visibility = "visible"


        this.addToBasket(data)       

    },


    addToBasket : function(data){
        // Adds event listeners to the Buy Buttons generated
        let buyButton = document.getElementsByClassName('add-to-basket')
        for (var i = 0; i < buyButton.length; i++) {
          buyButton[i].addEventListener('click', function(){
            let buyId = this.getAttribute("data-id")
            products.storeBasket(data, buyId)
            
          })
        }

    },

    storeBasket: function(data, buyId){
      let modalItemInsert = document.querySelector('.modal-item-insert')
      for(x = 0; x < modalItemInsert.children.length; x++){
        let test = modalItemInsert.children[x].getAttribute('data-item-id')
        if(test == buyId){
          return
        }
      }
       let i = data.findIndex(dataId)
       function dataId (element){
        return element.id == buyId
       }
       let image = data[i].image
       let title = data[i].title
       let price = data[i].price
       let itemId = data[i].id
       

       modalItemInsert.innerHTML += 
       `<div class='modal-item' data-item-id='${ itemId }'>
          <div class='modal-item-pic'>
            <img class='modal-image' src='${ image }'>
          </div>
          <div class='modal-item-title'>${ title }</div>
          <div class='modal-item-quantity'>
            <button class='button modal-minus'>-</button>
            <div class='quantity'>1</div>
            <button class='button modal-plus'>+</button>
          </div>
          <div class='modal-item-delete'>
            <svg data-delete="modal-delete" class='button' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
          </div>
          <div class='modal-item-price' data-price='${price}'>£${ price }</div>
       </div>`

       const basketNumber = document.querySelector(".basket-number")
       basketNumber.innerText++

       products.sortModalPrice() 

    },


 
}

products.fetchShop()


// <div class='item'>
//             <div class='image'>
//               <img class='item-image' src='${ image }'>
//             </div>
//             <div class='item-text'>
//               <p class='html-title'>${ title }</p>
//               <p class='html-old-price'>£${ oldPrice }</p>
//               <div class='price-buy'>
//                 <p class='html-new-price'>£${ price }</p>
//                 <button class='add-to-basket' data-id='${id}' >Buy</button>
//               </div>
//             </div>
//           </div>