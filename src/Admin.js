
import { useEffect, useState } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Headnav from './Headnav';
import bar from './image/more.png'
import axios from 'axios';


let x = []
export default function Admin() {


  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [catagory, setCatagory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {

    let sdata = JSON.parse(localStorage.getItem('productdata'))

    let ab = localStorage.getItem('id')

    if (JSON.parse(localStorage.getItem('productdata'))) {
      setData(sdata)
      for (let i = 0; i < sdata.length; i++) {
        if (sdata[i].id == ab) {
          setName(sdata[i].name)
          setDetails(sdata[i].details)
          setCatagory(sdata[i].catagory)
          setPrice(sdata[i].price)
          setImage(sdata[i].image)
        }
      }
    }
  }, [])



  const mixdata = () => {
    if (localStorage.getItem('id')) {
      update()
    }
    else {
      submit()
    }
  }

  const submit = () => {

    let obj = {
      name: name,
      details: details,
      catagory: catagory,
      price: price,
      image: image,
      id: Date.now(),
    }


    let already = false
    if (JSON.parse(localStorage.getItem('productdata'))) {
      for (let i = 0; i < data.length; i++) {
        if (name == data[i].name) {
          already = true
        }
      }
    }

    if (already) {
      alert('already register')
    }
    else {

      setData([...data, obj])
      localStorage.setItem('productdata', JSON.stringify([...data, obj]))
      setName('')
      setDetails('')
      setCatagory('')
      setPrice('')
      setImage([])

    }
  }

  const update = () => {
    let sdata = JSON.parse(localStorage.getItem('productdata'))
    let ab = localStorage.getItem('id')

    let updata = false
    for (let i = 0; i < sdata.length; i++) {
      if (name == sdata[i].name) {
        updata = true
      }
    }
    if (updata) {
      alert('already register')
    }
    else {
      let xyz = sdata.findIndex(obj => obj.id == ab)
      sdata[xyz].name = name
      sdata[xyz].details = details
      sdata[xyz].catagory = catagory
      sdata[xyz].price = price
      sdata[xyz].image = image
      setData(sdata)
      localStorage.setItem('productdata', JSON.stringify(sdata))
      localStorage.removeItem('id')

    }

    setName('')
    setDetails('')
    setCatagory('')
    setPrice('')
    setImage([])
  }

  const getBase64 = (file) => {
    x = []
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
      x.push(reader.result)
      setImage(x)
    }
  }

  const handlefile = (image) => {
    setImage([])
    for (let i = 0; i < image.length; i++) {
      getBase64(image[i])
    }
  }
  const imageRemove = (ab) => {
    let delimage = image.filter(obj => obj != ab)
    setImage(delimage)
  }

  const hanldeSidebarimg = () => {
    document.getElementById('functionSidebar').click()
  }

  return (
    <>

      <img src={bar} onClick={hanldeSidebarimg} width={50} className='head-btn' alt="" />
      <Headnav />

      <div className="content">

        <div className="login-root">
          <div
            className="box-root flex-flex flex-direction--column"
            style={{ minHeight: "100vh", flexGrow: 1 }}
          >

            <div
              className="box-root padding-top--24 flex-flex flex-direction--column"
              style={{ flexGrow: 1, zIndex: 9 }}
            >

              <div className="formbg-outer">
                <div className="formbg">
                  <div className="formbg-inner padding-horizontal--48">
                    <span className="padding-bottom--15">Add Product Description</span>
                    <div id="stripe-login">
                      <div className="field padding-bottom--24">
                        <label htmlFor="name">Name:</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="name" />
                      </div>
                      <div className="field padding-bottom--24">
                        <label htmlFor="details">Details:</label>
                        <input type="text" onChange={(e) => setDetails(e.target.value)} value={details} name="details" />
                      </div>
                      <div className="field padding-bottom--24">
                        <label htmlFor="catagory">Catagory:</label>
                        <select id="catagory" onChange={(e) => setCatagory(e.target.value)} value={catagory} className="catagory" name="cars">
                          <option className='ops'>Select Option ---</option>
                          <option value="Watch">Watch</option>
                          <option value="Shoes">Shoes</option>
                          <option value="Wollet">Wallet</option>
                          <option value="Shirt">Shirt</option>
                        </select>
                      </div>
                      <div className="field padding-bottom--24">
                        <label htmlFor="price">Price:</label>
                        <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} name="price" />
                      </div>
                      <div className="field padding-bottom--24">
                        <label htmlFor="image">Image:</label>
                        <input type="file" multiple onChange={(e) => handlefile(e.target.files)} value={Image} name="img" />

                        {
                          image.map((i) => {
                            return (
                              <>
                                <img src={i} alt='hello' width={70} />
                                <button onClick={() => imageRemove(i)}>-X-</button>
                              </>
                            )
                          })
                        }

                      </div>
                      <div className="field padding-bottom--24 newbt">
                        <button className='but1' onClick={mixdata} >Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  );
}

