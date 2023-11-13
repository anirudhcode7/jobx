import React from 'react';
import FormAction from './components/FormAction'

const handleSubmit=(e)=>{
    console.log("Interview Started")
}

function Home() {
  return (
    <div>
      <h1>Welcome to JobX</h1>
      <FormAction handleSubmit={handleSubmit} text="Practice Interview"/>
    </div>
  );
}

export default Home;
