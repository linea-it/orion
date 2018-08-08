import React from 'react';

const ReleaseForm = ({submitHandler}) => {
    let _releaseName, _releaseDate;
    const handleSubmit = (e) => {
        submitHandler(e, {
            name: _releaseName.value, 
            date: _releaseDate.value}
        );
        clearForm();
    }

    const clearForm = () => {
        _releaseDate.value = '';
        _releaseName.value = '';
    }
    return (
        <form onSubmit={handleSubmit} className="form-inline">
            <label className="sr-only" htmlFor="inlineFormInput">Release:</label>
            <select id="inlineFormInput" ref={select => _releaseName = select} className="form-control form-control-sm">
                <option>Small select</option>
            </select>

            <label className="sr-only" htmlFor="inlineFormInputGroup">Dataset:</label>
            <select id="inlineFormInputGroup" ref={select => _releaseDate = select} className="form-control form-control-sm">
                <option>Small select</option>
            </select>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    )
};

export default ReleaseForm;