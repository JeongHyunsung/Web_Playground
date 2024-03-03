const destination_button = document.querySelectorAll(".destination-subnav .mbox");
const text_button = document.querySelectorAll(".destination-subnav .nav-text");
const status_button = document.querySelectorAll(".destination-subnav .status-box");
const destination_d = document.getElementById("destination-d");
const destination_p = document.getElementById("destination-p");
const destination_l = document.getElementById("destination-l");
const destination_t = document.getElementById("destination-t");


console.log(destination_button);

destination_button.forEach((element, index, arr) =>{
    console.log(element.classList);
    
    element.addEventListener("click", function(e){
        if(element.classList.contains('moon-box')){cur_dest = 'Moon';}
        else if(element.classList.contains("mars-box")){cur_dest = 'Mars'}
        else if(element.classList.contains("europa-box")){cur_dest = 'Europa'}
        else{cur_dest = 'Titan'}


        console.log(cur_dest);
        arr.forEach((elem) =>{

        });
    }
});

