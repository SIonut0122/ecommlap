import React, {useContext} from "react";
import { MainContext} from "../MainHome";

function About( ) {
  const { count, setCount } = useContext(MainContext);
  
  return (
        <div className='home-container'>
          Current: {count}
        </div>
  );
}

export default About;
