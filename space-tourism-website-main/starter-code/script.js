const destination_button = document.querySelectorAll(".destination-subnav .mbox");
const text_button = document.querySelectorAll(".destination-subnav .nav-text");
const status_button = document.querySelectorAll(".destination-subnav .status-box");
const destination_d = document.getElementById("destination-d");
const destination_p = document.getElementById("destination-p");
const destination_l = document.getElementById("destination-l");
const destination_t = document.getElementById("destination-t");
const destination_i = document.getElementById("destination-i");
import data from "./data.json";


destination_button.forEach((element) =>{
    let cur_dest = 0;
    let nxt_dest = 0;
    console.log(element.classList);
    
    element.addEventListener("click", function(e){
        const destination_button_cur = document.querySelector(".destination-subnav .mbox.cur-nav");
        if(element.classList.contains('moon-box')){nxt_dest = 0;}
        else if(element.classList.contains("mars-box")){nxt_dest = 1;}
        else if(element.classList.contains("europa-box")){nxt_dest = 2;}
        else{nxt_dest = 3;}
        if(destination_button_cur.classList.contains('moon-box')){cur_dest = 0;}
        else if(destination_button_cur.classList.contains('mars-box')){cur_dest = 1;}
        else if(destination_button_cur.classList.contains('europa-box')){cur_dest = 2;}
        else{cur_dest = 3;}
        destination_button[cur_dest].classList.remove("cur-nav");
        text_button[cur_dest].classList.remove("cur-nav");
        status_button[cur_dest].classList.remove("visible");
        destination_button[nxt_dest].classList.add("cur-nav");
        text_button[nxt_dest].classList.add("cur-nav");
        status_button[nxt_dest].classList.add("visible");
        destination_d.innerText = "STR"
        
        console.log(data_obj);



        console.log(cur_dest, nxt_dest);
        
    });
});

