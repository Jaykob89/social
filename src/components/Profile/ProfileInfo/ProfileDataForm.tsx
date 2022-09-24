import React from "react";
import {createField, Input, TextArea} from "../../common/FormsControl/FormsControl";
import s from './ProfileInfo.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../common/FormsControl/FormsControl.module.css";
import {profileType} from "../Profile";



type FormDataType = {
    profile:profileType
}

// type ProfileFileKeys = GetStringKeys<profileType>

const ProfileDataForm:React.FC<InjectedFormProps<profileType,FormDataType>&FormDataType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {error &&
            <div className={styles.formSummaryError}>
                {error}
            </div>
        }

        <div>Full name {createField('Full Name', 'fullName', [], Input, '')}</div>
        <div>Looking for a job :{createField('', 'lookingForAJob', [], Input, {type: 'Checkbox'}, '')}
        </div>
        <div>My professional skills :
            {createField('My professional skills', 'lookingForAJobDescription', [], TextArea, '')}
        </div>
        <div>About me:
            {createField('About me', 'AboutMe', [], TextArea, '')}
        </div>
        <div>
            Contacts : {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:{createField(key, 'contacts.' + key, [], Input, '')}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<profileType,FormDataType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm