const destination_button = document.querySelectorAll(".destination-subnav .mbox");
const text_button = document.querySelectorAll(".destination-subnav .nav-text");
const status_button = document.querySelectorAll(".destination-subnav .status-box");
const destination_d = document.getElementById("destination-d");
const destination_p = document.getElementById("destination-p");
const destination_l = document.getElementById("destination-l");
const destination_t = document.getElementById("destination-t");
const destination_i = document.getElementById("destination-i");

const crew_button = document.querySelectorAll(".crew-subnav div");
const crew_m = document.getElementById("crew-m");
const crew_n = document.getElementById("crew-n");
const crew_p = document.getElementById("crew-p");
const crew_i = document.getElementById("crew-i");
const crew_i_s = document.getElementById("crew-i-s");

const tech_button = document.querySelectorAll(".tech-subnav div");
const tech_n = document.getElementById("tech-n");
const tech_p = document.getElementById("tech-p");
const tech_i = document.getElementById("tech-i");
const tech_i_s = document.getElementById("tech-i-s");

const mobile_nav_icon = document.querySelector(".mobile-nav-icon");
const mobile_nav = document.querySelector(".mobile-nav")
mobile-nav-icon



import data from './data.js';

destination_button.forEach((element) =>{
    let cur_dest = 0;
    let nxt_dest = 0;
    
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
        destination_d.innerText = data.destinations[nxt_dest].name.toUpperCase();
        destination_p.innerText = data.destinations[nxt_dest].description;
        destination_l.innerText = data.destinations[nxt_dest].distance.toUpperCase();
        destination_t.innerText = data.destinations[nxt_dest].travel.toUpperCase();
        destination_i.src = data.destinations[nxt_dest].images.webp;
    });
});

crew_button.forEach((element, index) =>{
    let cur_crew = 0;
    let nxt_crew = 0;
    element.addEventListener("click", function(e){
        const crew_button_cur = document.querySelector(".crew-subnav .cur-nav");
        if(crew_button_cur.classList.contains("a")){cur_crew = 0;}
        else if(crew_button_cur.classList.contains("b")){cur_crew = 1;}
        else if(crew_button_cur.classList.contains("c")){cur_crew = 2;}
        else{cur_crew = 3;}
        nxt_crew = index;
        crew_button[cur_crew].classList.remove("cur-nav");
        crew_button[nxt_crew].classList.add("cur-nav");
        crew_m.innerText = data.crew[nxt_crew].role.toUpperCase();
        crew_n.innerText = data.crew[nxt_crew].name.toUpperCase();
        crew_p.innerText = data.crew[nxt_crew].bio;
        crew_i.src = data.crew[nxt_crew].images.webp;
        crew_i_s.src = data.crew[nxt_crew].images.webp;
        crew_i.classList.remove('a', 'b', 'c', 'd');
        crew_i.classList.add((nxt_crew == 1)? 'b':(nxt_crew == 2)? 'c':(nxt_crew == 3)? 'd':'a');
        crew_i_s.classList.remove('a', 'b', 'c', 'd');
        crew_i_s.classList.add((nxt_crew == 1)? 'b':(nxt_crew == 2)? 'c':(nxt_crew == 3)? 'd':'a');
        console.log(cur_crew, nxt_crew);
    });

});

tech_button.forEach((element, index) =>{
    let cur_tech = 0;
    let nxt_tech = 0;
    element.addEventListener("click", function(e){
        const tech_button_cur = document.querySelector(".tech-subnav .cur-nav");
        if(tech_button_cur.classList.contains("a")){cur_tech = 0;}
        else if(tech_button_cur.classList.contains("b")){cur_tech = 1;}
        else{cur_tech = 2;}
        nxt_tech = index;
        tech_button[cur_tech].classList.remove("cur-nav");
        tech_button[nxt_tech].classList.add("cur-nav");
        tech_n.innerText = data.technology[nxt_tech].name.toUpperCase();
        tech_p.innerText = data.technology[nxt_tech].description;
        tech_i.src = data.technology[nxt_tech].images.portrait;
        tech_i_s.src = data.technology[nxt_tech].images.landscape;
        console.log(cur_tech, nxt_tech);
    });
});