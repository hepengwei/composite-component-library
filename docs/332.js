"use strict";(self.webpackChunkcomposite_component_library=self.webpackChunkcomposite_component_library||[]).push([[332],{3815:(n,e,a)=>{a.d(e,{A:()=>b,w:()=>k});var t=a(6540),s=a(7444),o=a(1196),l=a(6942),i=a.n(l),c=a(2989);const d="InputAndCheckbox_container__yadK+",r="InputAndCheckbox_checkbox__50f6e",u="InputAndCheckbox_noLabel__-JvmU";var h=a(4848);const b=n=>{const{value:e,checkboxLabel:a=null,disabled:l,inputProps:b={},checkboxProps:k={},onChange:g,"aria-invalid":p,setInputStatus:v,style:m={}}=n,x=(0,c.A)(l),f=(0,t.useMemo)((()=>{if(v&&"true"===p)return v(e)}),[p,e]);return(0,h.jsxs)("div",{className:d,style:m,children:[(0,h.jsx)(s.A,{value:e&&e.length>=1?e[0]:void 0,disabled:x,status:f,...b,onChange:n=>{const a=n?.target?.value,t=e&&e.length>=2?[a,e[1]]:[a,void 0];g?.(t)}}),(0,h.jsx)(o.A,{className:i()({[r]:!0,[u]:!a}),checked:e&&e.length>=2?e[1]:void 0,disabled:x,...k,onChange:n=>{const a=n?.target?.checked||!1,t=e&&e.length>=1?[e[0],a]:[void 0,a];g?.(t)},children:a})]})},k=[{fileName:"InputAndCheckbox.tsx",code:'/**\n * 左边输入框右边复选框的复合组件\n */\nimport React, { useMemo } from "react";\nimport { Input, Checkbox } from "antd";\nimport { CheckboxChangeEvent } from "antd/es/checkbox";\nimport classnams from "classnames";\nimport useFormDisabled from "hooks/useFormDisabled";\nimport styles from "./index.module.scss";\n\nexport type Value = [string | undefined, boolean | undefined];\ntype Status = "warning" | "error" | "" | undefined;\n\ntype InputAndCheckboxProps = {\n  value?: Value;\n  checkboxLabel?: string;\n  disabled?: boolean;\n  inputProps?: Record<string, any>; // 传递给输入框的属性值\n  checkboxProps?: Record<string, any>; // 传递给复选框的属性值\n  onChange?: (value: Value) => void;\n  "aria-invalid"?: string; // Form校验时会自动传入"true"\n  setInputStatus?: (value: Value | undefined) => Status; // 当form校验时，设置输入框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为\'\'\n  style?: Record<string, any>;\n};\n\nconst InputAndCheckbox = (props: InputAndCheckboxProps) => {\n  const {\n    value,\n    checkboxLabel = null,\n    disabled: selfDisabled,\n    inputProps = {},\n    checkboxProps = {},\n    onChange,\n    ["aria-invalid"]: invalid,\n    setInputStatus,\n    style = {},\n  } = props;\n  const disabled = useFormDisabled(selfDisabled);\n\n  const onInputChange = (e: any) => {\n    const v = e?.target?.value;\n    const newValue: Value =\n      value && value.length >= 2 ? [v, value[1]] : [v, undefined];\n    onChange?.(newValue);\n  };\n\n  const onCheckboxChange = (e: CheckboxChangeEvent) => {\n    const checked = e?.target?.checked || false;\n    const newValue: Value =\n      value && value.length >= 1 ? [value[0], checked] : [undefined, checked];\n    onChange?.(newValue);\n  };\n\n  const inputStatus = useMemo(() => {\n    if (setInputStatus && invalid === "true") {\n      return setInputStatus(value);\n    }\n    return undefined;\n  }, [invalid, value]);\n\n  return (\n    <div className={styles.container} style={style}>\n      <Input\n        value={value && value.length >= 1 ? value[0] : undefined}\n        disabled={disabled}\n        status={inputStatus}\n        {...inputProps}\n        onChange={onInputChange}\n      />\n      <Checkbox\n        className={classnams({\n          [styles.checkbox]: true,\n          [styles.noLabel]: !checkboxLabel,\n        })}\n        checked={value && value.length >= 2 ? value[1] : undefined}\n        disabled={disabled}\n        {...checkboxProps}\n        onChange={onCheckboxChange}\n      >\n        {checkboxLabel}\n      </Checkbox>\n    </div>\n  );\n};\n\nexport default InputAndCheckbox;'},{fileName:"InputAndCheckbox.module.scss",code:".container {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  .checkbox {\n    display: flex;\n    align-items: center;\n    margin-left: 8px;\n    span {\n      word-break: keep-all;\n    }\n  }\n  .noLabel {\n    span:not(.ant-checkbox) {\n      padding-inline-start: 0 !important;\n      padding-inline-end: 0 !important;\n    }\n  }\n}"}]},5754:(n,e,a)=>{a.d(e,{A:()=>k,w:()=>g});var t=a(6540),s=a(3888),o=a(1196),l=a(6942),i=a.n(l),c=a(2989);const d="RangePickerAndCheckbox_container__NEKOI",r="RangePickerAndCheckbox_checkbox__apXZT",u="RangePickerAndCheckbox_noLabel__5RO6Q";var h=a(4848);const{RangePicker:b}=s.A,k=n=>{const{value:e,checkboxLabel:a="",disabled:s,rangePickerProps:l={},checkboxProps:k={},onChange:g,"aria-invalid":p,setRangePickerStatus:v,style:m={}}=n,x=(0,c.A)(s),f=(0,t.useMemo)((()=>{if(v&&"true"===p)return v(e)}),[p,e]);return(0,h.jsxs)("div",{className:d,style:m,children:[(0,h.jsx)(b,{value:e&&e.length>=2?[e[0],e[1]]:[void 0,void 0],disabled:x,status:f,...l,onChange:n=>{let a=e&&e.length>=3?[void 0,void 0,e[2]]:[void 0,void 0,void 0];n&&n.length>=2&&(a=e&&e.length>=3?[n[0],n[1],e[2]]:[n[0],n[1],void 0]),g?.(a)}}),(0,h.jsx)(o.A,{className:i()({[r]:!0,[u]:!a}),checked:!!(e&&e.length>=3)&&e[2],disabled:x,...k,onChange:n=>{const a=n?.target?.checked||!1,t=e&&e.length>=2?[e[0],e[1],a]:[void 0,void 0,a];g?.(t)},children:a})]})},g=[{fileName:"RangePickerAndCheckbox.tsx",code:'/**\n * 左边日期范围选择框右边复选框的复合组件\n */\nimport React, { useMemo } from "react";\nimport { DatePicker, Checkbox } from "antd";\nimport { CheckboxChangeEvent } from "antd/es/checkbox";\nimport { Dayjs } from "dayjs";\nimport classnams from "classnames";\nimport useFormDisabled from "hooks/useFormDisabled";\nimport styles from "./index.module.scss";\n\nconst { RangePicker } = DatePicker;\n\ntype Value = [\n  Dayjs | null | undefined,\n  Dayjs | null | undefined,\n  boolean | undefined\n];\ntype Status = "warning" | "error" | "" | undefined;\n\ntype RangePickerAndCheckboxProps = {\n  value?: Value;\n  checkboxLabel?: string;\n  disabled?: boolean;\n  rangePickerProps?: Record<string, any>; // 传递给日期范围选择框的属性值\n  checkboxProps?: Record<string, any>; // 传递给复选框的属性值\n  onChange?: (value: Value) => void;\n  "aria-invalid"?: string; // Form校验时会自动传入"true"\n  setRangePickerStatus?: (value: Value | undefined) => Status; // 当form校验时，设置日期范围选择框的status属性值。当使用该属性时，要给外层的Form.Item设置validateStatus为\'\'\n  style?: Record<string, any>;\n};\n\nconst RangePickerAndCheckbox = (props: RangePickerAndCheckboxProps) => {\n  const {\n    value,\n    checkboxLabel = "",\n    disabled: selfDisabled,\n    rangePickerProps = {},\n    checkboxProps = {},\n    onChange,\n    ["aria-invalid"]: invalid,\n    setRangePickerStatus,\n    style = {},\n  } = props;\n  const disabled = useFormDisabled(selfDisabled);\n\n  const onRangePickerChange = (dates: [Dayjs, Dayjs] | null) => {\n    let newValue: Value =\n      value && value.length >= 3\n        ? [undefined, undefined, value[2]]\n        : [undefined, undefined, undefined];\n    if (dates && dates.length >= 2) {\n      newValue =\n        value && value.length >= 3\n          ? [dates[0], dates[1], value[2]]\n          : [dates[0], dates[1], undefined];\n    }\n    onChange?.(newValue);\n  };\n\n  const onCheckboxChange = (e: CheckboxChangeEvent) => {\n    const checked = e?.target?.checked || false;\n    const newValue: Value =\n      value && value.length >= 2\n        ? [value[0], value[1], checked]\n        : [undefined, undefined, checked];\n    onChange?.(newValue);\n  };\n\n  const rangePickerStatus = useMemo(() => {\n    if (setRangePickerStatus && invalid === "true") {\n      return setRangePickerStatus(value);\n    }\n    return undefined;\n  }, [invalid, value]);\n\n  return (\n    <div className={styles.container} style={style}>\n      <RangePicker\n        value={\n          value && value.length >= 2\n            ? [value[0], value[1]]\n            : [undefined, undefined]\n        }\n        disabled={disabled}\n        status={rangePickerStatus}\n        {...rangePickerProps}\n        // @ts-ignore\n        onChange={onRangePickerChange}\n      />\n      <Checkbox\n        className={classnams({\n          [styles.checkbox]: true,\n          [styles.noLabel]: !checkboxLabel,\n        })}\n        checked={value && value.length >= 3 ? value[2] : false}\n        disabled={disabled}\n        {...checkboxProps}\n        onChange={onCheckboxChange}\n      >\n        {checkboxLabel}\n      </Checkbox>\n    </div>\n  );\n};\n\nexport default RangePickerAndCheckbox;'},{fileName:"RangePickerAndCheckbox.module.scss",code:".container {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  .checkbox {\n    display: flex;\n    align-items: center;\n    margin-left: 8px;\n    span {\n      word-break: keep-all;\n    }\n  }\n  .noLabel {\n    span:not(.ant-checkbox) {\n      padding-inline-start: 0 !important;\n      padding-inline-end: 0 !important;\n    }\n  }\n}"}]}}]);