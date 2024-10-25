
export enum ComponentPropsType {
    STRING = "string",
    BOOLEAN = "boolean",
    COLOR = "color",
    UOM = "uom"
}

export interface ComponentProps {
    label: string;
    type: ComponentPropsType;
    value: string | number | boolean;
}