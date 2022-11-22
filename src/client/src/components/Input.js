import React from "react";
const Input = ({
  inputTheme,
  labelText,
  labelTheme,
  containerTheme,
  placeHolder,
}) => {
  return (
    <div className={`pt-8 grid grid-flow-row ${containerTheme}`}>
      {labelText && (
        <label
          className={`font-normal text-4xl font-button mb-2 text-gray-200 ${labelTheme}`}
        >
          {labelText}
        </label>
      )}
      <input
        className={`rounded-2xl h-16 w-auto ${inputTheme} pl-4`}
        placeholder={placeHolder}
      />
    </div>
  );
};
export { Input };