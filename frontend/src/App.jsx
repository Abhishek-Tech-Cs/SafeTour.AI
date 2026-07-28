import React from 'react'
import { useEffect } from 'react'
import api from './services/api'

const App = () => {

  useEffect(()=>{
    async function checkBackend(){
      try{
        const response=await api.get("/health")
        console.log(response.data)
      }catch{
        console.error(error)
      }
    }

    checkBackend();
  },[])

  return (
    <div>SafeTour.ai</div>
  )
}

export default App