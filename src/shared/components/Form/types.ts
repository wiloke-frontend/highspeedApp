import { ReactNode } from 'react';

export interface DefaultObject {
  [key: string]: any;
}

export interface DefaultField extends DefaultObject {
  name: string;
  type: string;
  required?: boolean;
}

export interface DefineRenderFieldsType extends DefaultObject {}

export interface LengthType {
  minimum?: number;
  maximum?: number;
  message: string;
}

export interface PresenceType {
  message: string;
}

export type FormHandleSubmitType = () => Promise<void>;

export interface RenderElementWithIndex {
  render: (handleSubmit: FormHandleSubmitType) => ReactNode;
  moveByIndex: (dataLength: number) => number;
}

export interface SpecialType {
  pattern: RegExp;
  message: string;
}

export interface Error {
  status: boolean;
  message: string;
}

export interface ConstraintItemType {
  presence?: {
    message: string;
  };
  special?: {
    pattern: RegExp;
    message: string;
  };
  length?: {
    minimum?: number;
    maximum?: number;
    message: string;
  };
}

export interface FormConstraints {
  [key: string]: ConstraintItemType;
}

export type FormFieldType<FieldT = {}, ValueT = any> = DefaultField &
  FieldT & {
    error?: Error;
    defaultValue?: ValueT;
    onChange: (value: ValueT) => void;
    onFocus?: (value: ValueT) => void;
  };

export interface FormCallbackParams<ResultT = DefaultObject> {
  result: ResultT;
  valid: boolean;
  errors: {
    [key: string]: Error;
  };
}

export type FormCallbackPropsType<ResultT extends DefaultObject> = ({ result, valid, errors }: FormCallbackParams<ResultT>) => void;

export interface FormProps<FieldT, ResultT extends DefaultObject> extends DefaultObject {
  fields: FieldT[];
  constraints?: FormConstraints;
  defaultResult?: DefaultObject;
  defaultErrors?: DefaultObject;
  onSubmit?: FormCallbackPropsType<ResultT>;
  onMount?: FormCallbackPropsType<ResultT>;
  onChange?: FormCallbackPropsType<ResultT>;
  customSubmit?: (handleSubmit: FormHandleSubmitType) => void;
  renderElementWithIndex?: RenderElementWithIndex;
  defineRenderFields: {
    [key: string]: string;
  };
}

export interface FormState<FieldT, ResultT extends DefaultObject> {
  fields: FieldT[];
  result: ResultT;
  constraints: FormConstraints;
  errors: {
    [key: string]: Error;
  };
}
