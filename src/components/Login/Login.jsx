import { Field, reduxForm } from "redux-form";


const LoginForm = (props) => {
 
  return (
    <form action="" method="post" onSubmit={props.handleSubmit}>
      <div>
        <Field name={"login"} placeholder={"login"} component={"input"} />
      </div>
      <div>
        <Field name={"password"} placeholder={"password"} component={"input"} />
      </div>
      <div>
        <Field type={"checkbox"} component={"input"} name={"rememberMe"} /> remember me
        </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

const LoginReduxForm = reduxForm( {
  form: 'login'
})(LoginForm)



const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData)
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>

  );
}

export default Login;