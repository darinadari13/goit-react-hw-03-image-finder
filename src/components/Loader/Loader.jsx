import { Bars } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      visible={true}
    />
  );
};

export default Loader;

Loader.propType = {
  Audio: PropTypes.func,
};
