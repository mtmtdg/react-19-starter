import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import type { BaseFormFieldProps, TextFormFieldProps } from './form-field.types';

interface FormFieldTextProps extends BaseFormFieldProps, TextFormFieldProps {}

export function FormFieldText({ name, control, label, required, type, placeholder, disabled }: FormFieldTextProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          placeholder={placeholder}
          error={isTouched && !!error}
          helperText={isTouched && error?.message ? error.message : ''}
          required={required}
          disabled={disabled}
          variant='outlined'
          size='medium'
          fullWidth
          value={field.value ? String(field.value) : ''}
          onChange={(e) => {
            const originalValue = e.target.value;
            const value = type === 'number' ? (originalValue === '' ? null : Number(originalValue)) : originalValue;
            field.onChange(value);
          }}
        />
      )}
    />
  );
}
