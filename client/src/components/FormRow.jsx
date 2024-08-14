const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name || labelText}
      </label>
      <input
        type={type}
        id={name}
        className="form-input"
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default FormRow;
