import React from 'react';
import s from './ProfileInfo.module.css'

type propsType = {
    status: string
}

class ProfileStatus extends React.Component<propsType> {

    state = {
        editMode: false
    }

    activateEditMode = ()=>{
        this.setState({
            editMode:true
        })
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;