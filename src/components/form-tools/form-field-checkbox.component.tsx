import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

import type { BaseFormFieldProps } from './form-field.types';

interface FormFieldCheckboxProps extends BaseFormFieldProps {
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
}

export function FormFieldCheckbox({ name, control, label, disabled, labelPlacement = 'end' }: FormFieldCheckboxProps) {
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
          <div style={{ flexGrow: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name={field.name}
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              }
              label={label}
              labelPlacement={labelPlacement}
            />

            {isTouched && error?.message && <FormHelperText>{error.message}</FormHelperText>}
          </div>
        </FormControl>
      )}
    />
  );
}
