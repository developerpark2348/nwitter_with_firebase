import React, {useEffect, useState} from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    });
  }, []) // firebase가 실행되기전 위의 isLoggedIn이 실행되기에 항상 null(로그인 되지 않음 으로 계산되어 loading이 뜨지 않는 버그가 생김. onAuthStateChanged를 사용하여 user의 변화가 생길경우 출력해줌.

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      {/*<footer>&copy; Nwitter {new Date().getFullYear()} </footer>*/}
    </>
  );
}

export default App;
