import { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#FF626F',
};

const Spinner = () => {
  return (
    <div className="sweet-loading absolute modalPosition">
      <ClipLoader color="#0000" cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};

export default Spinner;
