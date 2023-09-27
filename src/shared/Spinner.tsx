import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface pageInfo {
  page: boolean;
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#FF626F',
};

const Spinner = ({ page }: pageInfo) => {
  return (
    <div className={`w-full mx-auto ${page ? 'h-20' : 'h-40'}`}>
      <ClipLoader color="#0000" cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};

export default Spinner;
