import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControl/FormsControl";
import style from "../common/FormsControl/FormsControl.module.css"

const LoginForm = (props) => {

  return (
    <form method="post" onSubmit={props.handleSubmit}>
      <div>
        <Field name={"email"} placeholder={"email"} component={Input} validate={[required]} />
      </div>
      <div>
        <Field name={"password"}
          placeholder={"password"}
          component={Input}
          validate={[required]}
          type={"password"} />
      </div>
      <div>
        <Field type={"checkbox"} component={Input} name={"rememberMe"} /> remember me
        </div>
      { props.error && <div className={style.formSummaryError}>
        {props.error}
      </div>
      }
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)



const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>

  );
}

const mapStateToProps = (state) => (
  {
    isAuth: state.auth.isAuth,
  }
)

export default connect(mapStateToProps, { login })(Login);