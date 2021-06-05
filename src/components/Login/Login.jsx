import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControl/FormsControl";


const LoginForm = (props) => {
 
  return (
    <form action="" method="post" onSubmit={props.handleSubmit}>
      <div>
        <Field name={"login"} placeholder={"login"} component={Input} validate={[required]} />
      </div>
      <div>
        <Field name={"password"} placeholder={"password"} component={Input} validate={[required]} />
      </div>
      <div>
        <Field type={"checkbox"} component={Input} name={"rememberMe"} /> remember me
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