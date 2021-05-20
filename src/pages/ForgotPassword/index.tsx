import React, { useCallback, useRef, useState } from 'react';
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
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  // const history = useHistory();

  const handleSubmit = useCallback( async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/password/forgot', {
        email: data.email
      });

      addToast({
        type: 'success',
        title: 'E-mail de recuperação de senha enviado',
        description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque a sua caixa de entrada'
      });

      // history.push('/dashboard')

    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha'
      });
    } finally {
      setLoading(false);
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
            <Button type="submit" loading={loading}>
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