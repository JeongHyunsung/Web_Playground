import './App.css';
import {findInputError} from './utils/findInputError.js'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useState } from 'react'
function Head({cur_state}){
  return(
    <div className="header-ct">
      <div className="header-desktop">
        <Catalog state={0} cur_state={cur_state}/>
        <Catalog state={1} cur_state={cur_state}/>
        <Catalog state={2} cur_state={cur_state}/>
        <Catalog state={3} cur_state={cur_state}/>
      </div>
    </div>
  )
}

function Catalog({state, cur_state}){
  let circle;
  const data = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];
  console.log(state, cur_state);
  if(state === cur_state){
    circle = <div className="circle cur">{state+1}</div>
  }
  else{
    circle = <div className="circle">{state+1}</div>
  }
  return(
    <div className="catalog">
      {circle}
      <div className="catalog-info">
        <p>STEP {state+1}</p>
        <h5>{data[state]}</h5>
      </div>
    </div>
  )
}

function Cont({cur_state, cas, dt, sdt}){
  return(
    <div className="content-ct">
      <ContTitle cur_state={cur_state}/>
      <ContMain cur_state={cur_state} cas ={cas} dt ={dt} sdt={sdt}/>
    </div>
  )
}

function ContTitle({cur_state}){
  const data = [["Personal info", "Please provide your name, email adress, and phone number."], 
                ["Select your plan", "You have the option of monthly or yearly billing."],
                ["Pick add-ons", "Add-ons help enhance your gaming experience."],
                ["Finishing up", "Double-check everything looks OK before confirming."]];
  return(
    <div className="cont-title">
      <h3>{data[cur_state][0]}</h3>
      <p>{data[cur_state][1]}</p>
    </div>
  )
}

function ContMain({cur_state, cas, dt, sdt}){
  let content;
  switch(cur_state){
    case 0:
      content = <Cont1 cas = {cas} dt = {dt} sdt = {sdt}></Cont1>
      break;
    case 1:
      content = <Cont2 cas = {cas} dt = {dt} sdt = {sdt}></Cont2>
      break;
    case 2:
      content = <Cont3 cas = {cas} dt = {dt} sdt = {sdt}></Cont3>
      break;
    case 3:
      content = <Cont4 cas = {cas} dt = {dt}></Cont4>
      break;
    default:
      content =
        <div className="cont-5">
          
        </div>
  }

  return(
    <div className="cont-main">
      {content}
    </div>
  )
}

function Cont1({cas, dt, sdt}){
  const methods = useForm()
  const onSubmit = methods.handleSubmit(data => {
    sdt("a", "Name", data.Name);
    sdt("a", "Email", data["Email Address"]);
    sdt("a", "Phone", data["Phone Number"]);
    if(dt.complete.value < 1){
      sdt("complete", "value", 1);
    }
    cas(1);
    console.log(dt);
  })
  return(
    <div className="cont a">
      <FormProvider {...methods}>
        <form onSubmit={e => e.preventDefault()} noValidate id="cont-1-form">
          <FormSet 
            lb="Name" vl={(dt.complete.value >= 1)?dt.a.Name:""}
            tp="text" id="name" df="Stephen King"
            validation={{
              required:{value: true, message:'This field is required'}, 
            }}/>
          <FormSet 
            lb="Email Address" vl={(dt.complete.value >= 1)?dt.a.Email:""}
            tp="email" id="email" df="stephenking@lorem.com"
            validation={{
              required:{value: true, message:'This field is required'}, 
              pattern:{value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message:'Invalid E-mail address'},
            }}/>
          <FormSet 
            lb="Phone Number" vl={(dt.complete.value >= 1)?dt.a.Phone:""}
            tp="text" id="phone-number" df="+1 234 567 890"
            validation={{
              required:{value: true, message:'This field is required'}, 
            }}/>
        </form>
        <div className="control-bar">
          <div></div>
          <button className="submit-button" onClick={onSubmit}>Next Step</button>
        </div>
      </FormProvider>
    </div>
  )
}

function FormSet({lb, tp, vl, df, id, validation}){
  console.log(id, vl);
  
  let [isInputClicked, setIsInputClicked] = useState(false);
  const { register, formState: { errors } } = useFormContext();
  Object.assign(validation, {onBlur:()=>{setIsInputClicked(false);}})
  let er = findInputError(errors, lb);
  
  return(
    <div>
      <div className="form-upper">
        <h4>{lb}</h4>
        <p className="error-message">{er}</p>
      </div>
      <input className="form-lower" type={tp} id={id} defaultValue={vl} placeholder={isInputClicked?"" : "e.g. "+df} onFocus={()=>{setIsInputClicked(true);}} 
             {...register(lb, validation)}/>
    </div>
  )
}

function Cont2({cas, dt, sdt}){
  const [isyear, setIsyear] = useState((dt.complete.value >= 2)?!(dt.b.monthly):false);
  const [clicked, setClicked] = useState((dt.complete.value >= 2)?dt.b.option:0);
  const [over, setOver] = useState(-1);
  function onSubmit(){
    sdt("b", "option", clicked);
    sdt("b", "monthly", !(isyear));
    if(dt.complete.value < 2){
      sdt("complete", "value", 2);
    }
    cas(2);
    console.log(dt);
  }
  return(
    <div className="cont b">
      <div className ="option-box">
        <OptionCard 
          im="assets/images/icon-arcade.svg" nm="Arcade" pr={(isyear)?"90":"9"} x={isyear}
          cur_num={0} cl={clicked} set_cl={setClicked} ov={over} set_ov={setOver}></OptionCard>
        <OptionCard 
          im="assets/images/icon-advanced.svg" nm="Advanced" pr={(isyear)?"120":"12"} x={isyear}
          cur_num={1} cl={clicked} set_cl={setClicked} ov={over} set_ov={setOver}></OptionCard>
        <OptionCard 
          im="assets/images/icon-pro.svg" nm="Pro" pr={(isyear)?"150":"15"} x={isyear}
          cur_num={2} cl={clicked} set_cl={setClicked} ov={over} set_ov={setOver}></OptionCard>
      </div>
      <div className="toggle-box">
        <h5 style={{color:(!isyear)?"var(--col-mb)":"var(--col-cg)"}}>Monthly</h5>
        <div className="toggle-section" onClick={()=>setIsyear(!(isyear))}>
          <button className="toggle-button" style={{left:(isyear)?"1.25rem":"0.25rem"}}></button>
        </div>
        <h5 style={{color:(isyear)?"var(--col-mb)":"var(--col-cg)"}}>Yearly</h5>
      </div>
      <div className="control-bar">
        <button className="go-back-button" onClick={()=>{cas(0)}}>Go Back</button>
        <button className="submit-button" onClick={onSubmit}>Next Step</button>
      </div>

    </div>
  )
}

function OptionCard({im, nm, pr, x, cur_num, cl, set_cl, ov, set_ov}){
  return(
    <div 
      className = "option"
      style = {{borderColor: (cur_num===cl||cur_num===ov)?"var(--col-ppb)":"var(--col-cg)", backgroundColor:(cur_num===cl)?"var(--col-mn)":"var(--col-wh)"}}
      onClick = {()=>{set_cl(cur_num)}}
      onMouseOver = {()=>{set_ov(cur_num)}}
      onMouseLeave = {()=>{set_ov(-1)}}>

      <div className = "container">
        <img src={im} alt=""/>
        <h5>{nm}</h5>
        <p>{"$" + pr + "/" + ((x===true)?"yr":"mo")}</p>
        {x && <p className="sub-1">2 months free</p>}
      </div>
    </div>
  )
}

function Cont3({cas, dt, sdt}){
  const [isClicked, setIsClicked] = useState((dt.complete.value >= 3)?[dt.c.opt1, dt.c.opt2, dt.c.opt3]:[true, true, false]);
  const [over, setOver] = useState(-1);
  function setCl_f(n){
    let cp = [...isClicked];
    cp[n] = !(cp[n]);
    setIsClicked(cp);
  }
  function onSubmit(){
    sdt("c", "opt1", isClicked[0]);
    sdt("c", "opt2", isClicked[1]);
    sdt("c", "opt3", isClicked[2]);
    sdt("complete", "value", 3);
    cas(3);
    console.log(dt);
  }
  return(
    <div className="cont c">
      <div className="option-box">
        <OptionBar 
          nm="Online Service" dc="Access to multiplayer games"
          pr={(dt.b.monthly)?"1/mo":"10/yr"}
          cur_num={0} cl={isClicked} set_cl={setCl_f} ov={over} set_ov={setOver}/>
        <OptionBar 
          nm="Larger Storage" dc="Extra 1TB of cloud save"
          pr={(dt.b.monthly)?"2/mo":"20/yr"}
          cur_num={1} cl={isClicked} set_cl={setCl_f} ov={over} set_ov={setOver}/>
        <OptionBar 
          nm="Customizable Profile" dc="Custom theme on your profile"
          pr={(dt.b.monthly)?"2/mo":"20/yr"}
          cur_num={2} cl={isClicked} set_cl={setCl_f} ov={over} set_ov={setOver}/>
      </div>

      <div className="control-bar">
        <button className="go-back-button" onClick={()=>{cas(1)}}>Go Back</button>
        <button className="submit-button" onClick={onSubmit}>Next Step</button>
      </div>
    </div>
    
  )
}

function OptionBar({nm, dc, pr, cur_num, cl, set_cl, ov, set_ov}){
  return(
    <div 
      className="option"
      style={{borderColor: (cl[cur_num] || cur_num === ov)?"var(--col-ppb)":"var(--col-cg)",
              backgroundColor: (cl[cur_num])?"var(--col-mn)":"var(--col-wh)"}}
      onClick={()=>{set_cl(cur_num);}}
      onMouseOver={()=>{!cl[cur_num] && set_ov(cur_num);}}
      onMouseLeave={()=>{set_ov(-1);}}>
      <span 
        className="checkbox" 
        style={{borderColor: (cl[cur_num])?"var(--col-ppb)":"var(--col-cg)", 
                backgroundColor: (cl[cur_num])?"var(--col-ppb)":"var(--col-wh)"}}>
        {cl[cur_num] && <img className="check-img" src="assets/images/icon-checkmark.svg" alt=""></img>}
      </span>
      <div className="text-box">
        <h5>{nm}</h5>
        <p>{dc}</p>
      </div>
      <p className="pricing">{"+$" + pr}</p>
    </div>
  )
}

function Cont4({cas, dt}){
  const pr_atr = (dt.b.monthly===true)?"/mo":"/yr";
  let g_price;
  let l1 = (dt.b.option===0)?"Arcade":(dt.b.option===1)?"Advanced":"Pro";
  let r1 = (dt.b.option===0)?9:(dt.b.option===1)?12:15;
  l1 += (dt.b.monthly===true)?" (Monthly)":" (Yearly)";
  r1 *= (dt.b.monthly===true)? 1:10;
  g_price = r1;
  r1 += pr_atr;
  console.log(dt.c);
  g_price += (dt.c.opt1)?1:0;
  g_price += (dt.c.opt2)?2:0;
  g_price += (dt.c.opt3)?2:0;
  g_price *= (dt.b.monthly)?1:10;
  g_price += pr_atr;
  
  console.log(l1, r1);
  function onSubmit(){
    cas(5);
  }
  return(
    <div className="cont d">
      <div className="price-outer">
        <div className="price-inner-padding">
          <div className="price-inner">
            <div className="c-up">
              <div className="c-up-l">
                <h5>{l1}</h5>
                <p>Change</p>
              </div>
              <h5>{"$" + r1}</h5>
            </div>
            <hr></hr>
            <div className="c-dn">
              {dt.c.opt1 && <div className="c-dn-l"><p>Online Service</p><h5>{(dt.b.monthly===true)?"+$1/mo":"+$10/yr"}</h5></div>}
              {dt.c.opt2 && <div className="c-dn-l"><p>Larger Storage</p><h5>{(dt.b.monthly===true)?"+$2/mo":"+$20/yr"}</h5></div>}
              {dt.c.opt3 && <div className="c-dn-l"><p>Customizable Profile</p><h5>{(dt.b.monthly===true)?"+$2/mo":"+$20/yr"}</h5></div>}
            </div>
          </div>
        </div>
        <div className="price-summary">
          <p>{(dt.b.monthly===true)?"Total (per month)":"Total (per year)"}</p>
          <h5>{"+$" + g_price}</h5>
        </div>
      </div>
      <div className="control-bar">
        <button className="go-back-button" onClick={()=>{cas(2)}}>Go Back</button>
        <button className="submit-button" onClick={onSubmit}>Confirm</button>
      </div>
    </div>
  )
}

/*https://www.freecodecamp.org/news/how-to-validate-forms-in-react/*/


/* MAIN */
function App() {
  const [FormData, setFormData] = useState({a:{Name:"", Email:"", Phone:""}, b:{monthly:true, option:0}, c:{opt1:true, opt2:true, opt3:false}, d:{}, complete:{value:0}});
  const [appstate, setAppstate] = useState(2);
  const c_app = (n) =>{
    setAppstate(n);
  }
  function setData_f(k1, k2, v){
    let cp = {...FormData};
    cp[k1][k2] = v;
    setFormData(cp);
  }


  return (
    <div className="App">
      <div className="App-box">
        <Head cur_state={appstate}/>
        <Cont cur_state={appstate} cas ={c_app} dt={FormData} sdt={setData_f}/>
      </div>
    </div>
  );
}

export default App;
