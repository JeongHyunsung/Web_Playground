import './App.css';
import { useState } from 'react';

function Head(){
  return(
    <div className="Head">
      <img className="icon" src="favicon.svg" alt=""/>
      <p className="title">Hyunsung Jeong</p>
      <div className="global-nav">
        <NavButton nm="Blog"/>
        <NavButton nm="Project"/>
        <NavButton nm="About Me"/>
      </div>
    </div>
  )
}

function NavButton({nm}){
  const [isover, setIsover] = useState(false); 
  return(
    <div 
      onMouseOver={()=>{setIsover(true)}}
      onMouseLeave={()=>{setIsover(false)}}>
      <p style={{color: (isover)?"var(--col-h1)":"var(--col-pp)",
                 fontWeight: (isover)?"600":"500"}}>
        {nm}
      </p>
    </div>
  )
}








function App() {
  return (
    <div className="App">
      <Head/>
    </div>
  );
}

export default App;
