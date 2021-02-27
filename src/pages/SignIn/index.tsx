import React from 'react';
import { FiLogIn } from 'react-icons/fi';
 
import logoImg from '../../assets/logo.svg';
import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt=""/>
      
      <form >
        <h1>Faça seu login</h1>

        <input type="text" placeholder="E-mail"/>
        <input type="password" placeholder="Senha"/>
        <button type="submit">

        </button>      

        <a href="">Esqueci minha senha</a>
      </form>
      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;