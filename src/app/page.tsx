"use client"
import React, { useState } from 'react'
import axios from 'axios'
const page = () => {
  const [Userinput,setUserinput] = useState("")
  const asktoai = async() => {
    try {
      const res = await axios.post("/api/askai",{
        userquery:Userinput
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div>
      <input onChange={(e)=>setUserinput(e.target.value)}  type="text" placeholder='Chat with AI...' />
      <button className='bg-white text-black p-[0.5rem]'  onClick={asktoai} >Send</button>
    </div>
    </>
  )
}

export default page