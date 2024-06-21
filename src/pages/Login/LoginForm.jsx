import { Formik, Field, Form } from 'formik'
import { firebaseLogin } from '@/services/auth'
import { useUser } from '@/hooks/useUser'

export default function LoginForm() {
  const { setUser } = useUser()

  const initialValues = {
    email: '',
    password: '',
  }

  const handleSubmit = (values) => {
    const email = values.email
    const password = values.password

    firebaseLogin(email, password)
      .then((user) => {
        // Signed in
        setUser({
          email: user?.email ?? '',
          uid: user.uid,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className='login__form'>
        <Field name='email' type='email' placeholder='Email' />
        <Field name='password' type='password' placeholder='Contraseña' />
        <button type='submit'>LOGIN</button>
      </Form>
    </Formik>
  )
}
