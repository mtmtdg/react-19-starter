import { FormControl, FormHelperText } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { Controller } from 'react-hook-form';

import type { BaseFormFieldProps } from './form-field.types';

interface FormFieldDateTimePickerProps extends BaseFormFieldProps {
  format?: string;
  placeholder?: string;
}

export function FormFieldDateTimePicker({
  name,
  control,
  label,
  disabled,
  format = 'YYYY-MM-DD HH:mm',
  placeholder,
}: FormFieldDateTimePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <FormControl fullWidth error={isTouched && !!error}>
          <DateTimePicker
            {...field}
            label={label}
            format={format}
            disabled={disabled}
            slotProps={{
              textField: {
                placeholder,
                error: isTouched && !!error,
                fullWidth: true,
                variant: 'outlined',
                size: 'medium',
                onBlur: field.onBlur,
              },
            }}
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue: Dayjs | null) => {
              field.onChange(newValue ? newValue.toDate() : null);
            }}
          />
          {isTouched && error?.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
