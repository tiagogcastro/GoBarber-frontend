import React from 'react';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiUser, FiLock } from 'react-icons/fi';
 
import logoImg from '../../assets/logo.svg';
import { Background, Container, Content } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
    <Background />
    <Content>
      <img src={logoImg} alt=""/>
      
      <Form onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>

        <Input 
          name="name" 
          icon={FiUser} 
          type="text" 
          placeholder="Nome"/>
        <Input 
          name="email" 
          icon={FiMail} 
          type="text" 
          placeholder="E-mail"/>
        <Input 
          name="password" 
          icon={FiLock} 
          type="password" 
          placeholder="Senha"/>
        <Button type="submit">
          Cadastrar
        </Button>      

      </Form>
      <a href="login">
        <FiLogIn />
        Voltar para login
      </a>
    </Content>
  </Container>
  )
};

export default SignUp;