// PACKAGE IMPORTS
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// VALUE IMPORTS
import MyWalletLogo from '../components/MyWalletLogo';

// VALUE EXPORTS
export default function SignUpPage() {
  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" />
        <input placeholder="E-mail" type="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" />
        <button type="button">Cadastrar</button>
      </form>

      <Link>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  );
}

// STYLED COMPONENTS
const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
