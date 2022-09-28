const BuyLink = (props) => {
  return (
    <a href={props.link} className={props.ClassName}>
      {props.children}
    </a>
  );
};

export default BuyLink;
