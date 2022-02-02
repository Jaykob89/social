import React from "react";
import {Field, WrappedFieldProps} from "redux-form";
import styles from '../FormsControl/FormsControl.module.css'


const FormControl: React.FC<WrappedFieldProps> = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + '' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}

export const createField = (placeHolder: string | null, name: string, validators: any, component: any, type: any, text = '') =>
    <div>
        <Field
            placeholder={placeHolder} validate={validators}
            name={name} component={component} type={type}/>

    </div>