import React from 'react';
import PropTypes from 'prop-types';

const FileFieldGroup = ({
    name,
    onChange,
    type
}) => {
    return ( 
        <div className="form-group">
            <div className="form-control">
                <input
                    name={name}
                    type={type}
                    onChange={onChange}
                 />
            </div>
        </div>
     );
}


FileFieldGroup.propTypes = {
    name:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    type:PropTypes.string.isRequired,
}

FileFieldGroup.defaultProps={
    type:'file'
}
 
export default FileFieldGroup;