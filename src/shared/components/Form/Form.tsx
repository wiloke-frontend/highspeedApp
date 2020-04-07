import React, { Component, Fragment } from 'react';
import isEmpty from 'ramda/es/isEmpty';
import equals from 'ramda/es/equals';
import checkLength from './checkLength';
import checkSpecial from './checkSpecial';
import checkPresence from './checkPresence';
import getObjectFromFields from './getObjectFromFields';
import throwErrorType from './throwErrorType';
import throwErrorField from './throwErrorField';
import throwErrorFnExist from './throwErrorFnExist';
import { FormProps, FormState, FormCallbackPropsType, DefaultField, SpecialType, ConstraintItemType, Error, DefaultObject } from './types';

type DefaultProps<FieldT, ResultT> = Pick<
  FormProps<FieldT, ResultT>,
  | 'constraints'
  | 'defaultResult'
  | 'defaultErrors'
  | 'onSubmit'
  | 'onChange'
  | 'onMount'
  | 'customSubmit'
  | 'renderElementWithIndex'
  | 'defineRenderFields'
>;

export class Form<FieldT extends DefaultField, ValueT extends string | string[], ResultT extends DefaultObject> extends Component<
  FormProps<FieldT, ResultT>,
  FormState<FieldT, ResultT>
> {
  static defaultProps: DefaultProps<unknown, {}> = {
    constraints: {},
    defaultResult: {},
    defaultErrors: {},
    onSubmit: () => {},
    onChange: () => {},
    onMount: () => {},
    customSubmit: () => {},
    renderElementWithIndex: {
      render: () => null,
      moveByIndex: (dataLength: number) => dataLength - 1,
    },
    defineRenderFields: {},
  };

  state: FormState<FieldT, ResultT> = {
    fields: [],
    constraints: {},
    errors: {},
    result: {} as ResultT,
  };

  _afterMount = false;

  static getDerivedStateFromProps(nextProps: FormProps<unknown, {}>, prevState: FormState<DefaultField, DefaultObject>) {
    if (!isEmpty(prevState.fields) && !equals(nextProps.fields, prevState.fields)) {
      return {
        fields: nextProps.fields,
      };
    }
    return null;
  }

  async componentDidMount() {
    const { customSubmit, onMount } = this.props;

    // setState component ready
    await this._setState();

    // xử lý prop onChange
    !!onMount && this._handleFormOnChange(onMount);

    // customSubmit
    customSubmit?.(this._handleSubmit);

    this._afterMount = true;
  }

  componentDidUpdate(prevProps: FormProps<FieldT, ResultT>, prevState: FormState<FieldT, ResultT>) {
    const { onChange, fields, defaultResult } = this.props;
    const { result, fields: stateFields } = this.state;
    if (!equals(fields, prevProps.fields) || !equals(stateFields, prevState.fields) || !equals(defaultResult, prevProps.defaultResult)) {
      this._setState();
    }
    if (!equals(result, prevState.result) && this._afterMount && !!onChange) {
      this._handleFormOnChange(onChange);
    }
  }

  _setState = () => {
    const { defaultResult, defaultErrors, fields, constraints } = this.props;
    return new Promise(resolve => {
      this.setState(
        {
          fields,
          result: {
            ...getObjectFromFields(fields, ''),
            ...(defaultResult ?? {}),
          } as ResultT,
          constraints: {
            ...getObjectFromFields(fields, {}),
            ...(constraints ?? {}),
          },
          errors: defaultErrors ?? {},
        },
        resolve,
      );
    });
  };

  _getDefineRenderFields = () => {
    const { defineRenderFields } = this.props;
    return defineRenderFields;
  };

  _getPatterns = (type: string): RegExp | undefined => {
    const { constraints } = this.state;
    return constraints[type]?.special?.pattern;
  };

  _validFieldSpecial = (type: string, value: ValueT) => {
    const pattern = this._getPatterns(type);
    return value.length > 0 && pattern?.test(String(value));
  };

  // trả về true nếu mảng errors rỗng
  // nghĩa là không có lỗi xảy ra
  _getValid = () => {
    const { errors } = this.state;
    const messageErrors = Object.keys(errors).reduce((arr: string[], name: string) => {
      const { message } = errors[name];
      return [...arr, ...(!!message ? [message] : [])];
    }, []);
    return isEmpty(messageErrors);
  };

  _handleFormOnChange = (fn: FormCallbackPropsType<ResultT>) => {
    const { result, errors } = this.state;
    const valid: boolean = this._getValid();
    fn({ result, valid, errors });
  };

  // check những trường hợp có điền patterns
  _checkFieldSpecial = (name: FieldT['name'], value: ValueT, special: Partial<SpecialType>) => {
    return !this._validFieldSpecial(name, value) ? special?.message : '';
  };

  _hasValue = (value: ValueT) => {
    return typeof value === 'object' ? !isEmpty(value) : !!value;
  };

  _getMessageErrorFocus = (name: FieldT['name'], required: FieldT['required'], value: ValueT) => {
    const { constraints } = this.state;
    const { presence, length, special }: ConstraintItemType = constraints[name];
    if (!!presence && required && !this._hasValue(value)) {
      return presence.message;
    }
    if (!!length && required && (value.length <= (length.minimum || -1) || value.length >= (length.maximum || Infinity))) {
      return length.message;
    }
    if (!!special && required && value.length > 0) {
      return this._checkFieldSpecial(name, value, special);
    }
    return '';
  };

  _getMessageErrorBeforeSubmit = (name: FieldT['name'], required: ValueT, value: ValueT) => {
    const { constraints } = this.state;
    const { presence, length, special }: ConstraintItemType = constraints[name];
    if (!!presence && required && !this._hasValue(value)) {
      return presence.message;
    }
    if (!!length && value.length > 0 && (value.length <= (length.minimum || -1) || value.length >= (length.maximum || Infinity))) {
      return length.message;
    }
    if (!!special && value.length > 0) {
      return this._checkFieldSpecial(name, value, special);
    }
    return '';
  };

  _setResult = (name: FieldT['name'], value: ValueT) => {
    const { result } = this.state;
    this.setState({
      result: {
        ...result,
        [name]: value,
      },
    });
  };

  _setErrors = (name: FieldT['name'], error: string) => {
    const { errors } = this.state;
    this.setState({
      errors: {
        ...errors,
        [name]: {
          status: !!error,
          message: !!error ? error : '',
        },
      },
    });
  };

  _handleFieldFocus = (name: FieldT['name'], required: FieldT['required']) => (value: ValueT) => {
    const error = this._getMessageErrorFocus(name, required, value) ?? '';
    this._setErrors(name, error);
  };

  _getMessageErrorFieldChange = ({ name, value, required }: { name: FieldT['name']; value: ValueT; required: FieldT['required'] }) => {
    const { constraints } = this.state;
    const { length, presence, special }: ConstraintItemType = constraints[name];

    if (checkLength({ length, presence, special, value, required })) {
      return length?.message;
    }

    if (!!special && checkSpecial({ length, presence, special, value, required })) {
      return this._checkFieldSpecial(name, value, special);
    }

    if (checkPresence({ presence, required, value })) {
      return presence?.message;
    }
    return '';
  };

  _handleDefaultFieldChange = (name: FieldT['name'], required: FieldT['required']) => (value: ValueT) => {
    const error =
      this._getMessageErrorFieldChange({
        name,
        value,
        required,
      }) ?? '';
    this._setErrors(name, error);
    this._setResult(name, value);
  };

  _handleBeforeSubmit = async () => {
    const { result, fields, errors } = this.state;
    const getObj = (value: string): { [key: string]: ValueT } => {
      return fields.reduce<{ [key: string]: ValueT }>((obj, item) => {
        return {
          ...obj,
          [item.name]: item[value],
        };
      }, {});
    };
    await this.setState({
      errors: {
        ...errors,
        ...Object.keys(result).reduce<{ [key: string]: Error }>((obj, name) => {
          const value: ValueT = result[name];
          const required = getObj('required')[name];
          const error = this._getMessageErrorBeforeSubmit(name, required, value) ?? '';
          return {
            ...obj,
            [name]: {
              status: !!error,
              message: !!error ? error : '',
            },
          };
        }, {}),
      },
    });
  };

  _handleSubmit = async () => {
    const { onSubmit } = this.props;
    const { result } = this.state;
    await this._handleBeforeSubmit();
    const { errors } = this.state;
    const valid = this._getValid();
    onSubmit?.({ result, valid, errors });
  };

  _renderItem = (item: FieldT, index: number) => {
    const { errors, result } = this.state;
    const { type, name, required } = item;
    const errorDefault = {
      status: false,
      message: '',
    };
    const error = errors[item.name] || errorDefault;
    const itemGeneral = {
      ...item,
      error,
      defaultValue: result[name],
      onChange: this._handleDefaultFieldChange(name, required),
      onFocus: this._handleFieldFocus(name, required),
      index,
    };
    const defineRenderFields = this._getDefineRenderFields();

    const defineFieldKeys = Object.keys(defineRenderFields);
    for (let i = 0; i < defineFieldKeys.length; i += 1) {
      const key = defineFieldKeys[i];
      if (type === key) {
        const fn = defineRenderFields[key];
        const { props } = this;
        throwErrorFnExist(!!props[fn], type);
        return props[fn](itemGeneral);
      }
    }

    return throwErrorType(itemGeneral, defineRenderFields);
  };

  _handleItem = (item: FieldT, index: number, fields: FieldT[]) => {
    const { renderElementWithIndex } = this.props;
    if (!!renderElementWithIndex) {
      const { render, moveByIndex } = renderElementWithIndex;
      const _getIndex = moveByIndex(fields.length);
      const _index = _getIndex > fields.length - 1 ? fields.length - 1 : _getIndex;
      throwErrorField(item);
      const elementWithIndex = <Fragment key="___elementWithIndex___">{render(this._handleSubmit)}</Fragment>;
      return [
        _getIndex < 0 && index === 0 && elementWithIndex,
        <Fragment key={item.name}>{this._renderItem(item, index)}</Fragment>,
        index === _index && elementWithIndex,
      ];
    }
    return <Fragment key={item.name}>{this._renderItem(item, index)}</Fragment>;
  };

  render() {
    const { fields } = this.state;
    return !isEmpty(fields) && fields.map(this._handleItem);
  }
}
