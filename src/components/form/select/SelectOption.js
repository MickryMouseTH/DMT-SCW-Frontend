import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { Select } from 'antd'
const { Option } = Select;

const SelectOption = ({filterOption,loading = false, optionValue = { values: [], keyValue: "", keyName: "" }, placeholder = "", onChange = defaultFun, onFocus = defaultFun, onBlur = defaultFun, onSearch = defaultFun, ...props }, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  const fixAutocomplete = () => {
    document.querySelectorAll("#staffGroupId").forEach((e) => {
       e.setAttribute("autocomplete", "no");
      //you can put any value but NOT "off" or "false" because they DO NOT works
    })
  }


  return (
    <Select
      {...props}
      ref={inputRef}
      // showSearch={false}
      className="rounded-pill max-WS "
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      // onFocus={onFocus}    
      onFocus={fixAutocomplete}
      onBlur={onBlur}
      loading={loading}
    >
      {optionValue.values.map((value, index) => (
        <Option value={_isObject(value) ? value[optionValue.keyValue] : value} key={index}>{_isObject(value) ? value[optionValue.keyName] : value}</Option>
      ))}
    </Select>
  )
}

export default forwardRef(SelectOption)

const defaultFun = () => { }
const _isObject = (value) => {
  return typeof value === "object"
}