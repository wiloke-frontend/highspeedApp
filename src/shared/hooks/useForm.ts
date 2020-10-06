import { useState, useRef } from 'react';

interface Result {
  [key: string]: any;
}

export interface Field<NameT = string, ValueT = any> {
  name: NameT;
  defaultValue: ValueT;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
}

export type Error = keyof Omit<Field, 'name' | 'defaultValue'>;

export type Errors<ResultT> = { [K in keyof ResultT]: Error };

export interface HandleSubmitParams<ResultT extends Result> {
  result: ResultT;
  errors: Errors<ResultT>;
  isError: boolean;
}

export type HandleSubmit<ResultT extends Result> = ({ result, errors, isError }: HandleSubmitParams<ResultT>) => void;

function getError<ResultT extends Result, FieldT extends Field<keyof ResultT>>(field: FieldT, value: ResultT[FieldT['name']]) {
  let error: Error | '' = '';
  if (typeof value !== 'string' && !Array.isArray(value)) {
    return '';
  }
  if (field.required) {
    error = value ? '' : 'required';
  }
  if (field.minLength) {
    error = (field.required && !value) || value.length >= field.minLength ? error : 'minLength';
  }
  if (field.maxLength) {
    error = value.length <= field.maxLength ? error : 'maxLength';
  }
  if (field.pattern) {
    error =
      (field.required && !value) || value.length < (field.minLength || 0) || value.length > (field.maxLength || Infinity) || field.pattern.test(value)
        ? error
        : 'pattern';
  }
  return error;
}

export function useForm<ResultT extends Result>() {
  const [result, setResult] = useState({} as ResultT);
  const [errors, setErrors] = useState({} as Errors<ResultT>);
  const resultRef = useRef({} as ResultT);
  const errorsRef = useRef({} as Errors<ResultT>);
  const getNewResult = (result: ResultT) => (Object.values(result).length ? result : resultRef.current);
  const getNewErrors = (errors: Errors<ResultT>) => (Object.values(errors).length ? errors : errorsRef.current);
  const onChange = <FieldT extends Field<keyof ResultT, ResultT[FieldT['name']]>>(field: FieldT) => {
    resultRef.current = {
      ...resultRef.current,
      [field.name]: field.defaultValue,
    };
    errorsRef.current = {
      ...errorsRef.current,
      [field.name]: getError<ResultT, FieldT>(field, field.defaultValue),
    };
    return (value: ResultT[FieldT['name']]) => {
      setResult(result => ({
        ...resultRef.current,
        ...result,
        [field.name]: value,
      }));
      setErrors(errors => ({
        ...errorsRef.current,
        ...errors,
        [field.name]: getError<ResultT, FieldT>(field, value),
      }));
    };
  };
  const onSubmit = <EventT extends any>(handleSubmit: HandleSubmit<ResultT>) => (event: EventT) => {
    (event as any).preventDefault && (event as any).preventDefault();
    setResult(getNewResult);
    setErrors(getNewErrors);
    handleSubmit({
      result: getNewResult(result),
      errors: getNewErrors(errors),
      isError: Object.values(getNewErrors(errors)).reduce((str, item) => str + item, '') !== '',
    });
  };

  return {
    onChange,
    onSubmit,
    errors,
  };
}
