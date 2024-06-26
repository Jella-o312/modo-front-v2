import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Home/Header';
import Footer from './Home/Footer';
import Main from './Home/Main';
import MoblieTabBar from './Home/MoblieTabBar';
import Moim from './Moim/Moim';
// import axiosInstance from './axiosInstance';
// import axios from 'axios';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import KakaoLogin from './Login/KakaoLogin';
import GoogleLogin from './Login/GoogleLogin';
import NaverLogin from './Login/NaverLogin';
import AddMoim from './Moim/MoimComponent/AddMoim';
import MyPage from './MyPage/MyPage';
import MoimDetail from './Moim/MoimDetail';
import Faq from './Home/FAQ/Faq';
import Notice from './Home/FAQ/Notice';
import FaqDetails from './Home/FAQ/FaqDetails';
import NoticeDetails from './Home/FAQ/NoticeDetails';
import InquiryForm from './Home/FAQ/InquiryForm/InquiryForm';
import InquiryForm_write from './Home/FAQ/InquiryForm/InquiryForm_write';
import Notice_write from './Home/FAQ/Notice_write';
import Faq_write from './Home/FAQ/Faq_write';

function App() {

  // 모바일 하단 탭바 사용을 위한 현재 웹화면 경로 추적 코드
  const location = useLocation();
  const [pageNow, setPageNow] = useState(location.pathname);


  useEffect(() => {
    setPageNow(location.pathname);  
  }, [location.pathname]);

  

  const [userInfo, setUserInfo] = useState({
    username : '',
    nickname : '',
  });

  const [notice, setNotice] = useState({
    title : '',
    content : '',
    member : userInfo.username
  })

  const [isAuth, setIsAuth] = useState(false); // 로그인 상태 확인

  useEffect(() => {
    
    const storedJwt = sessionStorage.getItem('jwt');
    setIsAuth(storedJwt !== null);

  }, []);

  useEffect(() => {
    console.log("Auth바뀜 : " + isAuth);
  }, [isAuth]);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="App">
      <Header userInfo={userInfo} isAuth={isAuth} setIsAuth={setIsAuth}/>

      <div className='App-Body'>
        <Routes>
          <Route path ='/'element={<Main />}/> 
          <Route path='/moim' element={<Moim isAuth={isAuth}/>}/>
          <Route path='/addMoim' element={<AddMoim userInfo={userInfo}/>}/> 
          <Route path='/moimDetail' element={<MoimDetail />}/>


          <Route path ='/faq' element={<Faq userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/faqDetails/:id' element={<FaqDetails currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/faq_write' element={<Faq_write userInfo={userInfo} />} />

          <Route path ='/notice' element={<Notice userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/noticeDetails/:id' element={<NoticeDetails notice={notice} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/notice_write' element={<Notice_write userInfo={userInfo}/>} />

          <Route path='/inquiryForm' element={<InquiryForm userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path='/inquiryForm_write' element={<InquiryForm_write userInfo={userInfo} />}/>

          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/login' element={<Login userInfo={userInfo} setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/myPage' element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo}></MyPage>}></Route>
          <Route path='/oauth/kakao' element={<KakaoLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/oauth/google' element={<GoogleLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/oauth/naver' element={<NaverLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
        </Routes>
      </div>
      
      <Footer/>
      <MoblieTabBar pageNow={pageNow} />


    </div>
  );
}

export default App;
