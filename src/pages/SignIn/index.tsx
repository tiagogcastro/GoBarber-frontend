import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web'; 
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

// Icons
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
// Images
import logoImg from '../../assets/logo.svg';
// Styles
import { Background, Container, Content, AnimationContainer } from './styles';
// Components/imports de código
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback( async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({
        email: data.email,
        password: data.password
      });

      history.push('/dashboard')
      addToast({
        type: 'success',
        title: 'Login realizado com sucesso',
        description: 'Bem vindo de volta!'
      });

    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credencias.'
      });
    }
  }, [signIn, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt=""/>
          
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

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
              Entrar
            </Button>      

            <Link to="forgot-password">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
};

export default SignIn;