const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
