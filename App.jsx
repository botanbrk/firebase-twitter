import { BrowserRouter,Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";


function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    // Aktif oturumdaki değişikliği izleme
    onAuthStateChanged(auth,(user)=>{
      // Oturum açıksa anasayfaya 
      if(user){
        navigate('/feed')
        // Kapalıysa Login'e yönlendir
      }else{
        navigate('/')
      }
    });
  },[]);
  

  return (
    
     
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/feed" element={<Feed />} />
      </Routes>
      
    
  );
}

export default App;
