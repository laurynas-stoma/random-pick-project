import styles from './BuyLinksContainer.module.css';

const BuyLinksContainer = (props) => {
  return (
    <div className={`${styles['buy-links-container']} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default BuyLinksContainer;
