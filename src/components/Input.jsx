import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type, placeholder, id, required, onChange
}) => (
  <div>
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      required={required}
      onChange={onChange}
    />
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  placeholder: '',
  id: '',
  required: true,
};

export default Input;
