// PACKAGE IMPORTS
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// VALUE IMPORTS
import MyWalletLogo from '../components/MyWalletLogo';

// VALUE EXPORTS
export default function SignUpPage() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  function userSignUp(event) {
    event.preventDefault();
    setIsLoading(true);

    if (form.password !== form.passwordCheck) {
      // eslint-disable-next-line no-alert
      alert('The passwords do not match!');
      setIsLoading(false);
      return;
    }

    axios.post(`${REACT_APP_API_URL}/sign-up`, {
      name: form.name,
      email: form.email,
      password: form.password,
    })
      .then(() => {
        navigate('/');
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
    <SignUpContainer>
      <MyWalletLogo />

      <form onSubmit={userSignUp}>
        <input
          name="name"
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={handleForm}
          disabled={isLoading}
          required
        />
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
        <input
          name="passwordCheck"
          type="password"
          placeholder="Confirme a senha"
          value={form.passwordCheck}
          onChange={handleForm}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
        >
          Cadastrar
        </button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SignUpContainer>
  );
}

// STYLED COMPONENTS
const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
