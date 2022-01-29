import React, {ChangeEvent, useEffect, useState} from 'react';

type propsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: propsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])


    let activeEditMode = () => {
        setEditMode(true)
    }
    let deActiveEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activeEditMode}>{props.status || "-----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deActiveEditMode} onChange={onStatusChange} value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;