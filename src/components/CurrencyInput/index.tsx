import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { Input } from 'antd';
import { Money } from '@/typings';

export type CodePosition = 'before' | 'after';

export interface Props extends Omit<NumberFormatProps, 'suffix' & 'prefix'> {
  codePosition?: CodePosition;
  value?: Money;
  onChange?: (value: Money) => void;
}

const UnitInput: React.FC<Props> = ({
  className,
  codePosition = 'after',
  value,
  onChange,
  ...other
}: Props) => {
  const suffix = codePosition === 'after' && value?.currencyCode;
  const prefix = codePosition === 'before' && value?.currencyCode;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value ? Number(e.target.value) : null;
    if (onChange) {
      onChange({
        ...value,
        amount,
      });
    }
  };

  const input = (args: any) => {
    return (
      <Input
        onChange={handleChange}
        suffix={suffix}
        prefix={prefix}
        className={className}
        {...args}
      />
    );
  };
  return <NumberFormat onChange={handleChange} {...other} customInput={input} />;
};
export default UnitInput;
