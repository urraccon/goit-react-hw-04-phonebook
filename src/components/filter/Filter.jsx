import PropTypes from 'prop-types';
import styles from './Filter.module.css';
import { Input } from 'components/common/input/Input';

export const Filter = ({ filter, onChange }) => {
  return (
    <div className={styles.filter}>
      <Input
        labelName="Find contacts by name"
        onChange={onChange}
        name="filter"
        value={filter}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};
