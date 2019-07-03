import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({
    name,placeholder,
    value,onChange,
    error,label,
    disabled,type
}) => {
    return ( 
        <div className="form-group">
            <input 
                value={value}
                type={type}
                className={classnames('form-control form-control-lg',{
                    'is-invalid':error
                })}
                placeholder={placeholder}
                disabled={disabled}
                name={name}
                onChange={onChange} />
                {error ?(<div className="invalid-feedback">{error}</div>):null}
        </div>
    );
}


TextFieldGroup.propTypes = {
    value:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    onChange:PropTypes.func,
    placeholder:PropTypes.string,
    error:PropTypes.string,
    disabled:PropTypes.string
}


TextFieldGroup.defaultProps={
    type:'text'
}

 
export default TextFieldGroup;