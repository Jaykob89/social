import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../components/common/FormsControl/FormsControl";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import styles from '../components/common/FormsControl/FormsControl.module.css'

type FormDataType = {
    captchaUrl: string
    email: string
    password: string
    rememberMe: boolean
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string) => void
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType,LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input, {})}
            {createField('Password', 'password', [required], Input, 'password')}
            {createField(undefined, 'rememberMe', [], Input, 'checkbox', 'remember me')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', "captcha", [required], Input, {})}


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

const LoginReduxForm = reduxForm<FormDataType,LoginFormOwnProps>({form: 'login'})(LoginForm)


const Login: React.FC<MapStatePropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)