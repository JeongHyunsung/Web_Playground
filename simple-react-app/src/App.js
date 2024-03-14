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

function Cont({cur_state}){
  return(
    <div className="content-ct">
      <ContTitle cur_state={cur_state}/>
      <ContMain cur_state={cur_state}/>
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

function ContMain({cur_state}){
  let content;
  const methods = useForm()
  const onSubmit = methods.handleSubmit(data => {
    console.log(data);
  })

  switch(cur_state){
    case 0:
      content = 
        <div className="cont-1">
          <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault()} noValidate id="cont-1-form">
              <FormSet 
                lb="Name" 
                tp="text" id="name" df="Stephen King"
                validation={{
                  required:{value: true, message:'This field is required'}, 
                  }}/>
              <FormSet 
                lb="Email Address" 
                tp="email" id="email" df="stephenking@lorem.com"
                validation={{
                  required:{value: true, message:'This field is required'}, 
                  pattern:{value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message:'Invalid E-mail address'},
                  }}/>
              <FormSet 
                lb="Phone Number" 
                tp="text" id="phone-number" df="+1 234 567 890"
                validation={{
                  required:{value: true, message:'This field is required'}, 
                  }}
                />
            </form>
            <div className="control-bar">
              <button className="go-back-button">Go Back</button>
              <button className="submit-button" onClick={onSubmit}>Next Step</button>
            </div>
          </FormProvider>
        </div>;
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

function FormSet({lb, tp, df, id, validation}){
  let [isInputClicked, setIsInputClicked] = useState(false);
  const { register, formState: { errors } } = useFormContext();
  Object.assign(validation, {onBlur:()=>{setIsInputClicked(false);}})
  let er = findInputError(errors, lb);
  
  return(
    <div>
      <div className="form-upper">
        <h4>{lb}</h4>
        <Inputerror message = {er}></Inputerror>
      </div>
      <input className="form-lower" type={tp} id={id} placeholder={isInputClicked?"" : "e.g. "+df} onFocus={()=>{setIsInputClicked(true);}} 
             {...register(lb, validation)}/>
    </div>
  )
}

function Inputerror({message}){
  return(
    <p className="error-message">{message}</p>
  )
}

/*https://www.freecodecamp.org/news/how-to-validate-forms-in-react/*/


/* MAIN */
function App() {
  let cur_state = 0;
  return (
    <div className="App">
      <div className="App-box">
        <Head cur_state={cur_state}/>
        <Cont cur_state={cur_state}/>
      </div>
    </div>
  );
}

export default App;
