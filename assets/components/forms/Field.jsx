import React from 'react';

/**
 * - name
 * - label
 * - value
 * - onChange
 * - type
 * - placeholder
 * - error
 *
 * @returns {*}
 * @constructor
 */
const Field = (
    {
        name,
        label,
        value,
        onChange,
        type ="text",
        placeholder = "",
        error =""
    }) => (
        <div className="form-group">
            <label htmlFor={name} className="mt-2 mb-2">{label}</label>
            <input
                name={name}
                id={name}
                placeholder={placeholder || label}
                autoComplete={name}
                className={"form-control" + (error && " is-invalid")}
                value={value}
                onChange={onChange}
                type={type}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );

export default Field;