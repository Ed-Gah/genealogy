"use client";
import React, { ReactNode } from "react";

interface Props {
  inputValue?: string;
  defaultValue?: string;
  setInputValue?: any;
  placeholderText: string;
  label?: string;
  required?: boolean;
  disable?: boolean;
  inputIcon?: ReactNode;
  showIcon?: boolean;
  isValid?: boolean;
  errorText?: any;
  onBlur?: any;
  onFocus?: any;
  type?: string;
}

export default function TextInput({
  inputValue,
  setInputValue,
  placeholderText,
  label,
  required,
  disable,
  showIcon,
  inputIcon,
  isValid = true,
  errorText,
  onBlur,
  defaultValue,
  type = "text",
  onFocus,
}: Props) {
  return (
    <div className='relative'>
      <h2 className='relative max-w-max font-semibold font'>
        {required && (
          <span className='absolute -right-3 -top-1 block text-red-500'>*</span>
        )}
        <span className=" text-xs text-slate-600">{label}</span>
      </h2>
      <div
        className={`relative flex w-full rounded-sm py-1`}
      >
        <input
          value={inputValue}
          onChange={(value) => setInputValue(value.target.value)}
          placeholder={placeholderText}
          disabled={disable}
          className={`w-full border-[1px]  ${
            errorText
              ? "border-[var(--error-50)]"
              : "border-[var(--secondary-500)]"
          } flex-1 rounded-sm px-2 py-2 transition-all duration-200 placeholder:text-sm placeholder:font-light focus:outline-none focus:ring-1 ${
            !errorText
              ? " focus:ring-[var(--secondary-800)]"
              : " focus:ring-[var(--error-50)]"
          } `}
          onFocus={onFocus}
          type={type}
          onBlur={onBlur}
          max={type === "date" ? new Date(Date.now()).toISOString() : ""}
          defaultValue={defaultValue}
        />
        {showIcon && (
          <div className=' absolute right-2 text-sm text-slate-500'>
            {inputIcon}
          </div>
        )}
      </div>
      {errorText && (
        <p className='absolute -bottom-3 truncate pl-1 text-[12px] text-[var(--error-50)]'>
          {errorText?.length > 32
            ? `${errorText?.toString().slice(0, 28).concat(".....")}`
            : `${errorText}`}
        </p>
      )}
    </div>
  );
}
