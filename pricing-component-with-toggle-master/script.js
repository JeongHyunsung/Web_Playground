const toggleButton = document.querySelector(".toggle-button");
const toggleArea = document.querySelector(".toggle-area");
const basic_price = document.querySelector(".price1");
const prof_price = document.querySelector(".price2");
const master_price = document.querySelector(".price3");
const container = document.querySelectorAll(".container");

toggleArea.addEventListener("click", function(e){
    e.preventDefault()
    if(toggleButton.classList.contains("month")){
        toggleButton.classList.remove("month");
        basic_price.innerHTML = '<p class="price-num price1"><span class="dollar">&dollar;</span>199.99</p>';
        prof_price.innerHTML = '<p class="price-num price2"><span class="dollar">&dollar;</span>249.99</p>';
        master_price.innerHTML = '<p class="price-num price3"><span class="dollar">&dollar;</span>399.99</p>';
    }
    else{
        toggleButton.classList.add("month");
        basic_price.innerHTML = '<p class="price-num price1"><span class="dollar">&dollar;</span>19.99</p>';
        prof_price.innerHTML = '<p class="price-num price2"><span class="dollar">&dollar;</span>29.99</p>';
        master_price.innerHTML = '<p class="price-num price3"><span class="dollar">&dollar;</span>39.99</p>';
    }
});
container.forEach((element) =>{
    element.addEventListener("mouseover", function(e){
        element.classList.add("highlighted");
    })
    element.addEventListener("mouseout", function(e){
        element.classList.remove("highlighted");
    })
});
