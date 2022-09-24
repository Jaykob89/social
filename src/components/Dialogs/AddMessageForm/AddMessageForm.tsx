import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, TextArea} from "../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {NewMessageFormDataType} from "../Dialogs";


export type NewMessageFormDataKeysType = Extract<keyof NewMessageFormDataType, string>
type propsType = {}

const maxLength50 = maxLengthCreator(10)

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormDataType, propsType> & propsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormDataKeysType>('Enter your message', 'newDialogElementAdd', [required, maxLength50], TextArea, {})}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm<NewMessageFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

