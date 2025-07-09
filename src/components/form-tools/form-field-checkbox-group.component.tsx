import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

import type { BaseFormFieldProps, SelectionFormFieldProps } from './form-field.types';

interface FormFieldCheckboxGroupProps extends BaseFormFieldProps, SelectionFormFieldProps {
  row?: boolean;
}

export function FormFieldCheckboxGroup({
  name,
  control,
  label,
  required,
  disabled,
  items,
  bindValue,
  bindLabel,
  row = false,
}: FormFieldCheckboxGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <FormControl
          component='fieldset'
          error={isTouched && !!error}
          disabled={disabled}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {label && <FormLabel component='legend'>{label + (required ? '*' : '')}</FormLabel>}

          <FormGroup row={row}>
            {items.map((item) => {
              const itemValue = item[bindValue];
              const itemLabel = item[bindLabel];
              const isChecked = Array.isArray(field.value) && field.value.includes(itemValue);

              return (
                <FormControlLabel
                  key={String(itemValue)}
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => {
                        const currentValues = Array.isArray(field.value) ? field.value : [];

                        const newValues = e.target.checked
                          ? // 添加到数组
                            currentValues.includes(itemValue)
                            ? currentValues
                            : [...currentValues, itemValue]
                          : // 从数组中移除
                            currentValues.filter((value) => value !== itemValue);

                        field.onChange(newValues);
                      }}
                      onBlur={field.onBlur}
                    />
                  }
                  label={String(itemLabel)}
                />
              );
            })}
          </FormGroup>

          {isTouched && error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
