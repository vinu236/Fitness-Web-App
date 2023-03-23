const InputField = ({type,onChange,name,value,className,placeholder}) => {
  return (
<input className={className} type={type} value={value} onChange={onChange} name={name} placeholder={placeholder}
/>
  );
};

export default InputField;
