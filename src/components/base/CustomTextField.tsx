import React, {useState, forwardRef} from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {makeStyles} from '@mui/styles';
import {LIGHTGREEN, RED, WHITE} from '../../colors';
import {IFormValues} from '../../types';
import useValidate from '../../hooks/useValidate';
import {TextInputProps} from 'react-native';

type OmittedProps = 'style' | 'onChangeText' | 'value';
interface Props extends Omit<TextInputProps, OmittedProps> {
  fieldType: 'name' | 'email' | 'password';
  placeholder: string;
  textColor?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onClearError?: (fieldType: keyof IFormValues) => void;
  validateField: (field: keyof IFormValues, value: any) => string | undefined;
  onBlur?: () => void;
  enableShowAlertOnBlur: (message: string) => void;
  setFieldTouched?: (fieldType: keyof IFormValues, b: boolean) => void;
  showAlertOnBlur: boolean;
}

const useStyles = makeStyles({
  input: {
    '& .MuiInputBase-root': {
      color: WHITE,
      borderColor: WHITE,
    },
    '& .Mui-focused': {
      color: LIGHTGREEN,
      borderColor: LIGHTGREEN,
    },
    '& .Mui-error': {
      color: RED,
      borderColor: RED,
    },
  },
});

const CustomTextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      onBlur,
      placeholder,
      rightIcon,
      onRightIconPress,
      fieldType,
      validateField,
      enableShowAlertOnBlur,
      setFieldTouched,
      showAlertOnBlur,
      ...textInputProps
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>(
      ((textInputProps as any).value as string) || '',
    );
    const classes = useStyles();
    const {showAlert} = useValidate();

    const handleBlur = () => {
      const errorMessage = validateField(fieldType, inputValue);
      if (showAlertOnBlur) {
        showAlert(errorMessage || '');
      }
      onBlur?.();
      setFieldTouched?.(fieldType, true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
    };

    return (
      <TextField
        {...(textInputProps as any)}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        InputProps={{
          className: classes.input,
          endAdornment: rightIcon ? (
            <InputAdornment position="end">
              <IconButton onClick={onRightIconPress}>{rightIcon}</IconButton>
            </InputAdornment>
          ) : null,
        }}
        inputRef={ref}
      />
    );
  },
);

export default CustomTextField;
