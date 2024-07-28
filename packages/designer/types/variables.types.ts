
export interface VariableSetData {
    _id: string;
    name: string;
    slug: string;
    index: number;
    isStatic?: boolean;
    editEnabled?: boolean;
}

export interface VariableData {
    _id: string;
    name: string;
    slug: string;
    index: number;
    isStatic?: boolean;
    value_type: VariableValueType;
    set: VariableSetData | string; // it could be the set object or the set id
    value: string | number;
}

export enum VariableValueType {
    TEXT = 'text',
    COLOR = 'color',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
}


