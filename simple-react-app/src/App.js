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

function Cont({cur_state, cas, dt}){
  return(
    <div className="content-ct">
      <ContTitle cur_state={cur_state}/>
      <ContMain cur_state={cur_state} cas ={cas} dt ={dt}/>
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

function ContMain({cur_state, cas, dt}){
  let content;
  switch(cur_state){
    case 0:
      content = <Cont1 cas = {cas} dt = {dt}></Cont1>
      break;
    case 1:
      content = <Cont2 cas = {cas} dt = {dt}></Cont2>
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

function Cont1({cas, dt}){
  const methods = useForm()
  const onSubmit = methods.handleSubmit(data => {
    dt.a.Name=data.Name;
    dt.a.Email=data["Email Address"];
    dt.a.Phone=data["Phone Number"];
    dt.complete[0] = true;
    cas(1);
    console.log(dt);
  })
  return(
    <div className="cont a">
      <FormProvider {...methods}>
        <form onSubmit={e => e.preventDefault()} noValidate id="cont-1-form">
          <FormSet 
            lb="Name" vl={(dt.complete[0])?dt.a.Name:""}
            tp="text" id="name" df="Stephen King"
            validation={{
              required:{value: true, message:'This field is required'}, 
            }}/>
          <FormSet 
            lb="Email Address" vl={(dt.complete[0]===true)?dt.a.Email:""}
            tp="email" id="email" df="stephenking@lorem.com"
            validation={{
              required:{value: true, message:'This field is required'}, 
              pattern:{value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message:'Invalid E-mail address'},
            }}/>
          <FormSet 
            lb="Phone Number" vl={(dt.complete[0])?dt.a.Phone:""}
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

function Cont2({cas, dt}){
  const [isyear, setIsyear] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [over, setOver] = useState(-1);
  function onSubmit(){
    dt.b.option = clicked;
    dt.b.monthly = !(isyear);
    console.log(dt);
    cas(2);
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



/*https://www.freecodecamp.org/news/how-to-validate-forms-in-react/*/


/* MAIN */
function App() {
  let FormData = {a:{Name:"", Email:"", Phone:""}, b:{monthly:false, option:-1}, c:{}, d:{}, complete:[false, false, false, false]};
  const [appstate, setAppstate] = useState(0);
  const c_app = (n) =>{
    setAppstate(n);
  }


  return (
    <div className="App">
      <div className="App-box">
        <Head cur_state={appstate}/>
        <Cont cur_state={appstate} cas ={c_app} dt={FormData}/>
      </div>
    </div>
  );
}

export default App;
