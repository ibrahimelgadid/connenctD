import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

const SelectListGroup = ({
    value,error,
    onChange,name,info,options
}) => {
    const selectOptions = options.map(option =>(
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))
    return ( 
        <div className="form-group">
            <select
                name={name} 
                value={value}
                onChange={onChange}
                className={classnames('form-control',{'is-invalid':error})}
                
            >{selectOptions}</select>
            {info ?(<small className='form-text text-muted'>{info}</small>):null}
            {error ?(<div className='invalid-feedback'>{error}</div>):null}
        </div>
     );
}

SelectListGroup.propTypes = {
    value:PropTypes.string.isRequired,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    name:PropTypes.string.isRequired,
    info:PropTypes.string,
    options:PropTypes.array.isRequired
}
 
export default SelectListGroup;