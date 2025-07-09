import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

import type { BaseFormFieldProps, SelectionFormFieldProps } from './form-field.types';

interface FormFieldSelectProps extends BaseFormFieldProps, SelectionFormFieldProps {
  placeholder?: string;
  allowClear?: boolean;
}

export function FormFieldSelect({
  name,
  control,
  label,
  required,
  disabled,
  items,
  bindValue,
  bindLabel,
  placeholder = '',
  allowClear = false,
}: FormFieldSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => {
        const hasValue = field.value != null;

        return (
          <FormControl
            error={isTouched && !!error}
            required={required}
            disabled={disabled}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {label && (
              <InputLabel id={`${name}-label`} shrink={!!placeholder || hasValue}>
                {label}
              </InputLabel>
            )}

            <Select
              fullWidth
              labelId={`${name}-label`}
              label={label}
              displayEmpty
              value={field.value ?? ''}
              onChange={(e) => {
                const selectedValue = e.target.value;

                if (selectedValue === '') {
                  field.onChange(null);
                  return;
                }

                const foundItem = items.find((item) => String(item[bindValue]) === selectedValue);
                field.onChange(foundItem?.[bindValue] ?? null);
              }}
              onBlur={field.onBlur}
            >
              <MenuItem value='' disabled={!allowClear}>
                {placeholder}
              </MenuItem>

              {items.map((item) => {
                const itemValue = item[bindValue];
                const itemLabel = item[bindLabel];

                return (
                  <MenuItem key={String(itemValue)} value={String(itemValue)}>
                    {String(itemLabel)}
                  </MenuItem>
                );
              })}
            </Select>

            {isTouched && error?.message && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
