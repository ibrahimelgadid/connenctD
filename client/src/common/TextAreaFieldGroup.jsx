import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

const TextAreaGroupField = ({
    value,  placeholder,error,
    onChange,name,info
}) => {
    return ( 
        <div className="form-group">
            <textarea
                name={name} 
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                info={info}
                error={error}
                className={classnames('form-control',{'is-invalid':error})}
                
            ></textarea>
            {info ?(<small className='form-text text-muted'>{info}</small>):null}
            {error ?(<div className='invalid-feedback'>{error}</div>):null}
        </div>
     );
}

TextAreaGroupField.propTypes = {
    value:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    name:PropTypes.string.isRequired,
    info:PropTypes.string,
}
 
export default TextAreaGroupField;