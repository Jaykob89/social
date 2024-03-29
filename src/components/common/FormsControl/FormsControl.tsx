import React from "react";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import styles from '../FormsControl/FormsControl.module.css'
import {FieldValidatorType} from "../../../utils/validators/validators";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}




const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
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

export function createField<FormKeysType extends string>(placeHolder: string | undefined,
                            name: FormKeysType,
                            validators: FieldValidatorType[],
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = '') {
    return <div>
        <Field
            placeholder={placeHolder}
            validate={validators}
            name={name}
            component={component}
            {...props}
        />{text}

    </div>
}