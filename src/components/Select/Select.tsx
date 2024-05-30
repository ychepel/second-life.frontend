import { Key, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import {
  IconWrapper,
  OptionItem,
  OptionsList,
  SelectContainer,
  SelectLabel,
  SelectWrapper,
} from "./styles";
import { SelectDataProps, SelectProps } from "./types";

function Select<T extends Key>({
  options,
  value,
  onChange,
  placeholder,
  defaultIndex,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T | undefined>(
    defaultIndex !== undefined
      ? options[defaultIndex]?.selectData.value
      : value,
  );

  const handleSelect = (option: SelectDataProps<T>) => {
    setSelectedValue(option.selectData.value);
    onChange(option.selectData.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.selectData.value === selectedValue,
  );

  const displayValue = selectedOption
    ? selectedOption.selectData.label
    : placeholder;

  return (
    <SelectContainer>
      <SelectWrapper onClick={() => setIsOpen(!isOpen)} hasError={""}>
        <SelectLabel style={{ color: selectedValue ? "black" : "#6f6f6f" }}>
          {displayValue}
        </SelectLabel>
        <IconWrapper>
          {isOpen ? (
            <IoMdArrowDropup size="25px" />
          ) : (
            <IoMdArrowDropdown size="25px" />
          )}
        </IconWrapper>
      </SelectWrapper>
      {isOpen && (
        <OptionsList>
          {/* Остальные опции */}
          {options.map((option, index) => (
            <OptionItem key={index} onClick={() => handleSelect(option)}>
              {option.selectData.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
}

export default Select;