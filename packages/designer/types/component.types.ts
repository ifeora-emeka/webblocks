import { PageElement, } from "./designer.types";


export interface ComponentPropMap {

}

export interface ComponentRefData {
    component_id: string;
}

export interface ComponentData extends PageElement {
    custom_props: Record<string, string>;
}
