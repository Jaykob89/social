import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../components/common/FormsControl/FormsControl";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import styles from '../components/common/FormsControl/FormsControl.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type PropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}


export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input, {})}
            {createField('Password', 'password', [required], Input, 'password')}
            {createField(null, 'rememberMe', [], Input, 'checkbox', 'remember me')}

            {error &&
                <div className={styles.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)
const Login = (props: PropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)