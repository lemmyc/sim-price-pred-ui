import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../assets/images/avatar_1.png'
import styles from './Username.module.scss'

import { submitNumber } from './callAPI'

function Username() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [valid, setValid] = useState(true)
  
  const handleChangeInput = (e)=>{
    setInput(e.target.value)
  } 
  
  const handleSubmitInput = (e)=>{
    e.preventDefault()
    setValid(true)
    const regex = /^(0\d{9})$/
    if(regex.test(input)){
      let data = {
        'sim_number': input
      }
      let _respone = submitNumber('https://sim-price-pred-api.onrender.com', data)
      _respone.then(body => setResponse(body))
    }else{
      setValid(false)
    }
  }
  
  let priceDict = {
    0: 'Dưới 500.000 VND',
    1: '500.000 VNĐ đến 1.000.000 VNĐ',
    2: '1.000.000 VNĐ đến 3.000.000 VNĐ',
    3: '3.000.000 VNĐ đến 5.000.000 VNĐ',
    4: '5.000.000 VNĐ đến 10.000.000 VNĐ',
    5: '10.000.000 VNĐ đến 20.000.000 VNĐ',
    6: '20.000.000 VNĐ đến 50.000.000 VNĐ',
    7: '50.000.000 VNĐ đến 100.000.000 VNĐ',
    8: '100.000.000 VNĐ đến 200.000.000 VNĐ',
    9: '200.000.000 VNĐ đến 500.000.000 VNĐ',
    10: 'Trên 500.000.000 VNĐ',
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title">
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Định giá SIM Điện thoại</h4>
              <span className="py-4 text-xl w-2/3 text-center text gray-500">
                  by LemmyC
              </span>
            </div>
          </div>
          
          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <img className={styles.profile_img} src={avatar} alt="logo" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
               <input value={input} onChange={handleChangeInput} className={styles.textbox} type="text" placeholder='Nhập số điện thoại vào đây' />
               <button  className={styles.btn} type="submit" onClick={handleSubmitInput} >Let's go !!!</button>
            </div>
            {/* <div className="text-center py-4">
              <span className='text-gray-500'>Not a Member? <Link className='text-red-500' to="/register">Register Now</Link></span>
            </div> */}


          </form>

          <div className="textbox mt-5 text-center text-xl">
            {(valid) ? (
              (Object.keys(response).length === 0) ? 
                (<div className='textbox'>
                  Nhà mạng: {response["career"]}
                  <br/>
                  Giá tiền dự đoán: {priceDict[response["price_category"]]}
                </div>): (<></>)
            ):(
              <span className='text-red-500'>
                 Số điện thoại nhập vào không hợp lệ
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Username