// PACKAGE IMPORTS
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// VALUE EXPORTS
export default function TransactionsPage() {
  const [form, setForm] = React.useState({
    value: '',
    description: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const token = localStorage.getItem('token');
  let { tipo } = useParams();

  function validateAccess() {
    if (tipo === 'saida') {
      tipo = 'saída';
    }
    if ((tipo !== 'entrada') && (tipo !== 'saída')) {
      // eslint-disable-next-line no-alert
      alert('This address do not exist in this application!');
      navigate('/');
      return;
    }

    if (!token) {
      // eslint-disable-next-line no-alert
      alert('Please sign in to access the application!');
      navigate('/');
    }
  }

  const headerText = `Nova ${tipo}`;
  const buttonText = `Salvar ${tipo}`;

  useEffect(() => {
    validateAccess();
  }, []);

  function createTransaction(event) {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      description: form.description,
      value: (form.value),
      type: (tipo === 'entrada') ? 'inflow' : 'outflow',
    };
    axios.post(
      `${REACT_APP_API_URL}/transactions`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    )
      .then(() => {
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
    <TransactionsContainer>
      <h1>{headerText}</h1>
      <form onSubmit={createTransaction}>
        <input
          name="value"
          type="number"
          step="0.01"
          min="0"
          placeholder="Valor"
          value={form.name}
          onChange={handleForm}
          disabled={isLoading}
          required
        />
        <input
          name="description"
          type="text"
          placeholder="Descrição"
          value={form.name}
          onChange={handleForm}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
        >
          {buttonText}
        </button>
      </form>
    </TransactionsContainer>
  );
}

// STYLED COMPONENTS
const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
