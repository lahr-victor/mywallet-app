// PACKAGE IMPORTS
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// VALUE EXPORTS
export default function HomePage() {
  const [transactions, setTransactions] = React.useState([]);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const token = localStorage.getItem('token');
  function validateAccess() {
    if (!token) {
      // eslint-disable-next-line no-alert
      alert('Please sign in to access the application!');
      navigate('/');
    }
  }

  const greetingMessage = `Olá, ${localStorage.getItem('user')}`;
  const totalAmmount = 0;

  function loadTransactions() {
    axios.get(`${REACT_APP_API_URL}/transactions`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setTransactions(response.data);
      })

      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error.response.data);
      });
  }

  useEffect(() => {
    validateAccess();
    loadTransactions();
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>
          {greetingMessage}
        </h1>
        <Link to="/">
          <BiExit onClick={() => { localStorage.clear(); }} />
        </Link>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction) => (
            <ListItemContainer>
              <div>
                <span>{dayjs(transaction.date).format('MM/DD')}</span>
                <strong>{transaction.description}</strong>
              </div>
              <Value color={transaction.type}>
                {(transaction.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={totalAmmount < 0 ? 'outflow' : 'inflow'}>
            {(totalAmmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <Link to="/nova-transacao/entrada">
          <button type="button">
            <AiOutlinePlusCircle />
            <p>
              Nova
              <br />
              entrada
            </p>
          </button>
        </Link>
        <Link to="/nova-transacao/saida">
          <button type="button">
            <AiOutlineMinusCircle />
            <p>
              Nova
              <br />
              saída
            </p>
          </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  );
}

// STYLED COMPONENTS
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  width: 100%;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  article {
    display: flex;
    justify-content: space-between; 
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  button {
    width: 150px;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === 'inflow' ? 'green' : 'red')};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
