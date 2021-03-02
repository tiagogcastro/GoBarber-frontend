import React, {useCallback} from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLogIn, FiMail, FiUser, FiLock } from 'react-icons/fi';
 
import logoImg from '../../assets/logo.svg';
import { Background, Container, Content } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback( async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

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