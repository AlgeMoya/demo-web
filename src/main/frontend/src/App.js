import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState('')

  const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  async function login(username) {
    try {
      const response = await instance.post('/login', null, {
        params: {
          username,
        },
      });
      console.log(response.data);
      sessionStorage.setItem('loggedIn', username)
    } catch (error) {
      console.error('Error during login:', error.response.data);
    }
  }

  async function getSessionInfo() {
    try {
      const response = await instance.get('/session-info');
      console.log('지금 로그인한 사용자: ', response.data);
    } catch (error) {
      console.error('Error during getting session info:', error.response.data);
    }
  }

  async function logout() {
    try {
      const response = await instance.get('/logout');
      sessionStorage.removeItem('loggedIn')
      console.log(response.data);
    } catch (error) {
      console.error('Error during logout:', error.response.data);
    }
  }

  useEffect(() => {
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          백엔드에서 가져온 데이터입니다 : {hello}
        </div>
        <button onClick={() => {
          login('testUser'); }
        }>로그인</button>
        <button onClick={() => {
            getSessionInfo() }
        }>로그인 정보 띄우기</button>
        <button onClick={() => {
          logout() }
        }>로그아웃</button>
      </header>
    </div>
  );
}

export default App;
