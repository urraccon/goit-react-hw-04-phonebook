import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ type = 'button', children, onClick }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};
