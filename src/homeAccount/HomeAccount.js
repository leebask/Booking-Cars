import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import logoVN from '../images/vn.webp'
import logoAnh from '../images/anh.webp'
import Car4 from '../images/4cho.png'
import Car16 from '../images/16cho.png'
import Car32 from '../images/xe32cho.png'



import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import './HomeAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../features/userSlice'
import { setCars, selectCars } from '../features/carsSlice'
import Cars from './Cars'
import { auth } from '../firebase'
import SelectTextFields from './SelectTextFields'
import { Pagination } from '@mui/material'
import Footer from '../footer/Footer'
//DB
import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'




function HomeAccount({isMenuOpen,setIsMenuOpen,}) {

  const user = useSelector(selectUser)
  const cars = useSelector(selectCars)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(
     ()=>{
      async function getCars(){
        let _cars=await getDocs(collection(db,'Cars'))
        _cars=_cars.docs.map(t => ({
          ...t.data(),
          id: t.id
        }))
        dispatch(setCars(_cars))
      }
      getCars()
    },
    []
  )

  const logoutOfApp = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout())
        navigate('/')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="homeAccount">
      {/* phonenumber */}
      
       
        <div className="homeAccount__header">
            <div className="homeAccount__logo">
            <Link to='/'>
                <img className='homeAccount__logoImg' 
                     src={logo}
                     alt=''
                />
            </Link>
            </div>
            <div className='homeAccount__links'>
            <Link to='/homeaccount'>home</Link>
            <Link to='/nhaxe'>nhà xe</Link>
            <Link to='/cartour'>chuyến xe</Link>
            <Link to='/contact'>contact</Link>
            <Link to='/account'>Tài khoản</Link>
            </div>
            <div className='homeAccount__right'>
            
            <div className={isMenuOpen?'homeAccount_imgtrans--hidden':""}> 
                <img className='homeAccount__logoNation' 
                     src={logoVN}
                     alt=''/>
            
                <img className='homeAccount__logoNation' 
                     src={logoAnh}
                     alt=''onClick={()=> console.log('a')}/>
            </div>
            <div className={isMenuOpen ? 'homeAccount_imgtrans--hidden':""}>
            <Link to='/login' onClick={logoutOfApp} 
            className='homeAccount__btnLogin'>Đăng xuất</Link>
            </div>
            </div>
            <div 
            className='homeAccount__menu' 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <CloseIcon className='homeAccount__closeMenu' /> : <MenuIcon />}
        </div>
        
        </div>
        <div className="homeAccount__info">
          <div className="homeAccount__person">
            <h4>{"Chào "+user?.displayName}</h4>
          </div>
          <div className="homeAccount__right">
            <Link to='/'> Lịch sử</Link>
            <Link to='/'className='logout'> 
            thoát
            <LogoutIcon />
            </Link>
          </div>
        </div>
        <div className="homeAccount__cars">
          {cars.map(car=>(
            <Cars
              imgSrc={car.image}
              typeCar={car.Name}
              infoText={car.Desc}
              // bookCar4
              
            />
          ))}
        {/* <Cars
          imgSrc={Car4}
          typeCar='4 Ghế'
          infoText="Thích hợp di chuyển cặp đôi , tốc độ đưa khách rất nhanh"
          bookCar4
          
        />
        <Cars
          imgSrc={Car16}
          typeCar='16 Ghế'
          infoText="Thích hợp di chuyển gia đình với sự cơ động tiện lợi"

        />
        <Cars
          imgSrc={Car32}
          typeCar='32 Ghế'
          infoText="Thích hợp di chuyển cặp đôi , tốc độ đưa khách rất nhanh"
          
        /> */}
        </div>

        
        <Pagination count={10} color="primary" />
        



       
        {/* connect */}

        <Footer />
    
   
    </div>
  )
}

export default HomeAccount