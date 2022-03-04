import React from 'react';
import Field from "./Field";

/**
 * - name
 * - label
 * - value
 * - onChange
 * - error
 *
 * @returns {*}
 * @constructor
 */
const Select =(
    {
        name,
        label,
        value,
        onChange,
        error ="",
        children
    }) => (
    <div className="form-group">
        <label htmlFor={name} className="mt-2 mb-2">{label}</label>
        <select
            onChange={onChange}
            name={name}
            id={name}
            value={value}
            className={"form-control" + (error && " is-invalid")}
            >
            {children}
        </select>
        <p className="invalid-feedback">{error}</p>
    </div>
    )
;
export default Select;
