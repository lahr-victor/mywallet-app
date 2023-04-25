// PACKAGE IMPORTS
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// VALUE IMPORTS
import MyWalletLogo from '../components/MyWalletLogo';

// VALUE EXPORTS
export default function SignInPage() {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  function userSignIn(event) {
    event.preventDefault();
    setIsLoading(true);

    axios.post(`${REACT_APP_API_URL}/sign-in`, form)
      .then((response) => {
        localStorage.setItem('token', (response.data.token));
        localStorage.setItem('user', (response.data.user));
        navigate('/home');
      })

      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error.response.data);
        setIsLoading(false);
      });
  }

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <SignInContainer>
      <MyWalletLogo />

      <form onSubmit={userSignIn}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleForm}
          disabled={isLoading}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleForm}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
        >
          Entrar
        </button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SignInContainer>
  );
}

// STYLED COMPONENTS
const SignInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
