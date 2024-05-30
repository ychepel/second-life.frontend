import { InputProps } from "./types";
import {
  InputComponentContainer,
  InputWrapper,
  ErrorMessage,
  PasswordInput,
  InputLabel,
} from "./styles";

function Input({
  name,
  placeholder,
  label,
  onInputChange,
  value,
  error,
  onBlur,
}: InputProps) {
  return (
    <InputComponentContainer>
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <PasswordInput
          name={name}
          type={"text"}
          placeholder={placeholder}
          onChange={onInputChange}
          value={value}
          error={error}
          onBlur={onBlur}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputComponentContainer>
  );
}

export default Input;
