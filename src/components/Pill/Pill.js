import styles from './Pill.module.css';

const Pill = (props) => {
  return (
    <div className={`${styles.pill} ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Pill;
