import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web'; 
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

// Icons
import { FiLogIn, FiMail } from 'react-icons/fi';
// Images
import logoImg from '../../assets/logo.svg';
// Styles
import { Background, Container, Content, AnimationContainer } from './styles';
// Components/imports de código
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
// import { useAuth } from '../../hooks/auth';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  // const history = useHistory();

  const handleSubmit = useCallback( async (data: ForgotPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      // Recuperação de senha

      // history.push('/dashboard')
      addToast({
        type: 'success',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha'
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
  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt=""/>
          
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input 
              name="email" 
              icon={FiMail} 
              type="text" 
              placeholder="E-mail"/>
            <Button type="submit">
              Recuperar
            </Button>      

          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
};

export default ForgotPassword;