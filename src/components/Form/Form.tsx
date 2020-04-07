import React, { PureComponent, ReactNode } from 'react';
import { TextInput, Keyboard } from 'react-native';
import { FormItem, Button, Input, Icons, View, FormCallbackParams } from 'shared';
import { Form as SForm, FormHandleSubmitType, FormFieldType, FormCallbackPropsType, FormConstraints } from 'shared';
import { FeatherNameType } from 'types/FeatherNameType';

export interface ItemType {
  name: string;
  label?: string;
  placeholder: string;
  type: 'text' | 'password';
  required?: boolean;
  icon?: FeatherNameType;
  index?: number;
}

export interface FormProps<TResult> {
  fields: ItemType[];
  buttonText: string;
  buttonLoading?: boolean;
  constraints?: FormConstraints;
  defaultResult?: TResult;
  onSubmit?: FormCallbackPropsType<TResult>;
  onChangeResult?: (result: FormCallbackParams<TResult>) => void;
  customText?: () => ReactNode;
}

export default class Form<TResult> extends PureComponent<FormProps<TResult>> {
  _submitEditing = () => {
    Keyboard.dismiss();
  };

  updateRef = (name: string) => (ref: TextInput) => {
    // @ts-ignore
    this[name] = ref;
  };

  _handleMoveByIndex = (dataLength: number) => {
    return dataLength;
  };

  _handleListenChange = (result: FormCallbackParams<TResult>) => {
    const { onChangeResult } = this.props;
    this.setState({
      result,
    });
    onChangeResult?.(result);
  };

  _handleSubmit = (index?: number) => () => {
    const { fields } = this.props;
    if (index !== fields.length - 1) {
      if (index !== undefined) {
        const inputName = fields[index + 1].name;
        // @ts-ignore
        this[`${inputName}_${index + 1}`].focus();
        return;
      }
    } else {
      this._submitEditing();
    }
  };

  _customSubmit = (handleSubmit: FormHandleSubmitType) => {
    this._submitEditing = handleSubmit;
  };

  _renderInput = ({ label, name, placeholder, required, icon, error, onChange, onFocus, type, index }: FormFieldType<ItemType>) => {
    const { fields } = this.props;
    return (
      <FormItem label={label} errorMessage={error?.message} required={required}>
        <Input
          placeholder={`${placeholder} ${required ? '*' : ''}`}
          Right={!!icon ? <Icons.Feather name={icon} size={20} color="dark3" style={{ marginHorizontal: 10 }} /> : null}
          onChangeText={onChange}
          onFocusText={onFocus}
          secureTextEntry={type === 'password'}
          inputRef={this.updateRef(`${name}_${index}`)}
          onSubmitEditing={this._handleSubmit(index)}
          returnKeyType={index !== fields.length - 1 ? 'next' : 'go'}
          // returnKeyLabel={index !== fields.length - 1 ? 'Next' : 'Login'}
          autoCapitalize="none"
        />
      </FormItem>
    );
  };

  _renderButtonSubmit = (handleSubmit: FormHandleSubmitType) => {
    const { buttonText, buttonLoading, customText } = this.props;
    return (
      <View>
        {customText?.()}
        <Button block onPress={handleSubmit} tachyons={['wAuto', 'br2']} loading={buttonLoading}>
          {buttonText}
        </Button>
      </View>
    );
  };

  render() {
    const { fields, onSubmit, constraints, defaultResult } = this.props;
    return (
      <View>
        <SForm
          fields={fields}
          defineRenderFields={{
            text: 'renderInput',
            password: 'renderInput',
          }}
          constraints={constraints}
          defaultResult={defaultResult}
          renderInput={this._renderInput}
          onSubmit={onSubmit}
          onChange={this._handleListenChange}
          renderElementWithIndex={{
            render: this._renderButtonSubmit,
            moveByIndex: this._handleMoveByIndex,
          }}
          customSubmit={this._customSubmit}
        />
      </View>
    );
  }
}
