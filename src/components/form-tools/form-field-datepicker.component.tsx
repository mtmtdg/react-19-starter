import { FormControl, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { Controller } from 'react-hook-form';

import type { BaseFormFieldProps } from './form-field.types';

interface FormFieldDatePickerProps extends BaseFormFieldProps {
  format?: string;
  placeholder?: string;
}

export function FormFieldDatePicker({
  name,
  control,
  label,
  disabled,
  format = 'YYYY-MM-DD',
  placeholder,
}: FormFieldDatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <FormControl error={isTouched && !!error} sx={{ display: 'flex', flexDirection: 'column' }} disabled={disabled}>
          <DatePicker
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
