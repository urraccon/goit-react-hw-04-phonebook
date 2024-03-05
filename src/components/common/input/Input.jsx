import PropTypes from 'prop-types';
import styles from './Input.module.css';

export const Input = ({
  labelName,
  onChange,
  type = 'text',
  inputName,
  value,
  pattern,
  title,
  required,
}) => {
  return (
    <label className={styles.field}>
      <span className={styles.name}>{labelName}</span>
      <input
        onChange={onChange}
        className={styles.input}
        type={type}
        name={inputName}
        value={value}
        pattern={pattern}
        title={title}
        required={required}
      />
    </label>
  );
};

Input.propTypes = {
  labelName: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  inputName: PropTypes.string,
  value: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
};
