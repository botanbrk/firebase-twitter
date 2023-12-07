import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithRedirect, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


const Auth = () => {
    const [ isError, setIsError ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ signUp, setSignup ] = useState(false);
    const navigate = useNavigate();

    // aktif kullanıcı varsa ana sayfaya yönlendir
    useEffect(() => {
        if (auth.currentUser) {
            navigate('/feed');
        }
    }, []);


// from gönderildiğinde çalışır
    const handleSubmit =(e) => {
        e.preventDefault();
        
        // formdaki değerlere erişme

        const mail = e.target[0].value;
        setEmail(mail);
        const pass = e.target[1].value;

        if(signUp){
            //hesap oluştur
            createUserWithEmailAndPassword(auth, mail, pass)
            .then(()=>{
                navigate('/feed')
                toast.success('Hesabınız oluşturuldu')
            })
            .catch((err)=> {
                toast.error(`Üzgünüz bir hata oluştu: ${err.code} `);
            });
        } else{
            // giriş yap
signInWithEmailAndPassword(auth, mail, pass)
.then(() => {
    navigate('/feed');
    toast.success('Hesabınıza giriş yapıldı');
})
.catch((err) => {
    // giriş bilgileri eğer yanlışsa hata olduğunu state'e aktar
    if (err.code === 'auth/invalid-login-credentials'){
        setIsError(true);
    }
    toast.error(`Üzgünüz bir hata oluştu ${err.code}`);
});

        }
    };

    // şifre sıfırlama
    const handlePassReset = () => {
        sendPasswordResetEmail(auth, email)
        .then(()=> toast.info("Mailinize sıfırlama e-postası gönderildi")
        );
        

       alert(email);

    };
    // Google ile giriş yap
    const handleGoogle = () =>{
        signInWithPopup(auth, googleProvider )
        .then(() => {
            navigate("/feed");
            toast.success('Google hesabınız ile giriş yapıldı');
        });
    };
  return (
    <section className="h-screen bg-zinc-800 grid place-items-center">
      <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
            <img className="h-[60px]" src="/twitter-x.webp" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>

        <div onClick={handleGoogle} className="flex items-center bg-white py-2 px-5 rounded-full cursor-pointer gap-3 hover: bg-gray-300">
            <img className="h-[20px]" src="/Google2.png" />
            <span className="text-black"> Google ile { signUp ? 'kaydol' : 'giriş yap' } </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
            <label>Email</label>
            <input 
            autoComplete="email"
            className="text-black rounded mt-1 p-2 shadow-lg focus:shadow-[gray]" type="email" />

            <label className="mt-5">Şifre</label>
            <input 
            autoComplete="password"
            className="text-black rounded mt-1 p-2 shadow-lg focus:shadow-[gray]" type="password" />

            <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
                { signUp ? 'Kaydol' : 'Giriş Yap' }
            </button>

            <p className="mt-5">
                <span className="text-gray-500 me-2">
                    { signUp ? 'Hesabınız varsa' : 'Hesabınız yoksa' }
                    </span>
                <span onClick={() => setSignup(!signUp)} 
                className="cursor-pointer text-blue-500" >
                    {signUp ? 'Giriş Yap': 'Kaydol'}
                    </span>
            </p>

            { /* hata varsa */ }
            {
                isError && !signUp && 
                <p onClick={handlePassReset} className="text-red-400 mt-4 cursor-pointer">
                    Şifrenizi mi unuttunuz?
                    </p>
            }
        </form>
      </div>
    </section>
  )
}

export default Auth;
