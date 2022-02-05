import React from "react";
import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer";


let updateStatus = () => {

}

describe('Profile component', () => {
    test('Status from props should be in the state', () => {
        // @ts-ignore
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={updateStatus}/>);
        const root = component.root;
        expect(root.instance.state.status).toBe('it-kamasutra.com');
    })

    test('after creation input', () => {
        // @ts-ignore
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={updateStatus}/>);
        const root = component.root;
        expect(()=>{
            let input = root.findByType('input')
        }).toThrow();
    })
    test('auto creation span should contains correct status', () => {
        // @ts-ignore
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={updateStatus}/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('it-kamasutra.com');
    })
    test('input should be displayed in editMode instead of span', () => {
        // @ts-ignore
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={updateStatus}/>);
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe('it-kamasutra.com');
    })
    test('callback should be called', () => {
        // @ts-ignore
        let mockCallBack = jest.fn()
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        // @ts-ignore
        instance.deActivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    })

})