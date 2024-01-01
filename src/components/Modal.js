import React from "react";

const Modal = ({ isOpen, onClose, schema, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    schema.properties.forEach((prop) => {
      data[prop.key] = formData.get(prop.key);
    });
    onSubmit(data);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          {schema.properties.map((prop) => (
            <div key={prop.key}>
              <label>{prop.label}</label>
              <input
                type={prop.type}
                name={prop.key}
                required={prop.required}
              />
            </div>
          ))}
          <button type="submit">Add Node</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
