import './App.css';


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
      <ContControl cur_state={cur_state}/>
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
  switch(cur_state){
    case 0:
      content = 
        <div className="cont-1">
          <form>
            <FormSet tp="Name" df="Stephen King"/>
            <FormSet tp="Email Address" df="stephenking@lorem.com"/>
            <FormSet tp="Phone Number" df="+1 234 567 890"/>
          </form>
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

function FormSet({tp, df}){
  let default_value = df;
  let error_message = "";
  let blur_str = "this.placeholder=" + {df};
  return(
    <div>
      <div className="form-upper">
        <h4>{tp}</h4>
        <p className="error-message">{error_message}</p>
      </div>
      <input className="form-lower" type="text" placeholder={df} onFocus={(e)=>{e.target.placeholder=""}} onBlur={(e)=>{e.target.placeholder=df}}/>
    </div>
  )
}

function ContControl({cur_state}){
  return(
    <div className="cont-control">

    </div>
  )
}


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
