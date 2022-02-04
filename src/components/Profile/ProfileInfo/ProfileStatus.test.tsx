import React from "react";
import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer";


let updateStatus = ()=>{

}

describe('Profile component', () => {
    test('Status from props should be in the state', () => {
        // @ts-ignore
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={updateStatus}/>);
        const root = component.root;
        expect(root.instance.state.status).toBe('it-kamasutra.com');
    })
})