import React, { useRef } from 'react';
import { Input, Typography } from 'antd';
import { InputProps } from 'antd/lib/input';

const { Text } = Typography;

export interface Props extends Omit<InputProps, 'value' | 'onChange'> {
  value?: number;
  onChange?: (value?: number) => void;
}

const UnitInput: React.FC<Props> = ({
  suffix: propsSuffix,
  prefix,
  className,
  value,
  onChange,
}: Props) => {
  const ref = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      (e.target.value && e.target.value.length > 0 && Number(e.target.value)) || undefined;
    if (onChange) {
      onChange(newValue);
    }
    (ref.current as any).focus();
  };

  const suffix = (propsSuffix && <Text type="secondary">{propsSuffix}</Text>) || null;
  return (
    <Input
      value={value}
      onChange={handleChange}
      ref={ref}
      suffix={suffix}
      prefix={prefix}
      className={className}
    />
  );
};
export default UnitInput;
