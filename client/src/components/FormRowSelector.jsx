const FormRowSelector = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {list.map((itemValue) => {
          return (
            <option value={itemValue} key={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelector;
