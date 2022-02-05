import React from "react";
import {create} from "react-test-renderer";
import Paginator from "./Paginator";

describe('Paginator component', () => {
    test('Pages count is 11 but should be showed 10', () => {
        // @ts-ignore
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(10);
    })
    test('if pages count is more then 10 button NEXT should be present', () => {
        // @ts-ignore
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let button = root.findAllByType('button')
        expect(button.length).toBe(1);
    })

})