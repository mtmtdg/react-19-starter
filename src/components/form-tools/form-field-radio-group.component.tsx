import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';

import type { BaseFormFieldProps, SelectionFormFieldProps } from './form-field.types';

interface FormFieldRadioGroupProps extends BaseFormFieldProps, SelectionFormFieldProps {
  row?: boolean;
}

export function FormFieldRadioGroup({
  name,
  control,
  label,
  required,
  disabled,
  items,
  bindValue,
  bindLabel,
  row = false,
}: FormFieldRadioGroupProps) {
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

          <RadioGroup
            row={row}
            value={field.value ?? ''}
            onChange={(_, selectedValue) => {
              if (selectedValue === '') {
                field.onChange(null);
                return;
              }

              const foundItem = items.find((item) => String(item[bindValue]) === selectedValue);
              field.onChange(foundItem?.[bindValue] ?? null);
            }}
            onBlur={field.onBlur}
          >
            {items.map((item) => {
              const itemValue = item[bindValue];
              const itemLabel = item[bindLabel];

              return (
                <FormControlLabel
                  key={String(itemValue)}
                  value={String(itemValue)}
                  control={<Radio />}
                  label={String(itemLabel)}
                />
              );
            })}
          </RadioGroup>

          {isTouched && error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
