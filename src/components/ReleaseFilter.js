import React from 'react';
import Proptypes from 'prop-types';

const ReleaseForm = () => {
  return (
    <form className="form-inline">
      <label className="sr-only" htmlFor="inlineFormInput">
        Release:
      </label>
      <select className="form-control form-control-sm">
        <option>All</option>
      </select>

      <label className="sr-only" htmlFor="inlineFormInputGroup">
        Dataset:
      </label>
      <select className="form-control form-control-sm">
        <option>All</option>
      </select>
    </form>
  );
};

ReleaseForm.propTypes = {
  submitHandler: Proptypes.string.isRequired,
};

export default ReleaseForm;
