// PACKAGE IMPORTS
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// VALUE IMPORTS
import MyWalletLogo from '../components/MyWalletLogo';

// VALUE EXPORTS
export default function SignInPage() {
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" />
        <button type="button">Entrar</button>
      </form>

      <Link>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  );
}

// STYLED COMPONENTS
const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
