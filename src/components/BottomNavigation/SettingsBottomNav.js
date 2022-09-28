import styles from './SettingsBottomNav.module.css';

const SettingsBottomNav = (props) => {
  const clickCancel = () => {
    props.onClickSettings('SETTINGS_CANCEL');
  };

  const clickConfirm = () => {
    props.onClickSettings('SETTINGS_CONFIRM');
  };

  return (
    <div className={styles.container}>
      <div className={styles.settings}>
        <button className={styles['btn-cancel']} onClick={clickCancel}>
          Cancel
        </button>
        <button className={styles['btn-confirm']} onClick={clickConfirm}>
          Confirm Selections
        </button>
      </div>
    </div>
  );
};

export default SettingsBottomNav;
