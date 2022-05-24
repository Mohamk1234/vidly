const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} className="form-control"></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
