import React from "react";
import { twMerge } from "tailwind-merge";

export const Input = ({
  label,
  type = "text",
  className = "",
  value,
  placeholder,
  onChange,
  onKeyDown,
  minWidth = "3rem",
  name,
  onBlur,
}) => {
  return (
    <div className="inline-flex flex-row items-center sprite-info_larger-input_W8slE">
      <label className="inline-flex flex-row items-center">
        {label && (
          <span className="mr-2">
            <span>{label}</span>
          </span>
        )}
        <input
          name={name}
          label={label}
          tabIndex="0"
          placeholder={placeholder}
          type={type}
          className={twMerge(
            "text-center p-1 border rounded-xl outline-none cursor-text font-semibold text-xs text-black flex-none w-8",
            className
          )}
          onKeyDown={onKeyDown}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: `${(value?.length + 1) * 0.6}rem`,
            minWidth: minWidth,
          }}
        />
      </label>
    </div>
  );
};

export default Input;
