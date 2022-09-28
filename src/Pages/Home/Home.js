import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles['left-side']}>
        <div className={styles.gallery}>
          <img
            src={'/images/book1.jpeg'}
            alt="home cover 1"
            data-home-image="1"
          />
          <img
            src={'/images/book2.jpeg'}
            alt="home cover 2"
            data-home-image="2"
          />
          <img
            src={'/images/book3.jpeg'}
            alt="home cover 3"
            data-home-image="3"
          />
          <img
            src={'/images/book4.jpeg'}
            alt="home cover 4"
            data-home-image="4"
          />
          <img
            src={'/images/book5.jpeg'}
            alt="home cover 5"
            data-home-image="5"
          />
          <img
            src={'/images/book6.jpeg'}
            alt="home cover 6"
            data-home-image="6"
          />
          <img
            src={'/images/book7.jpeg'}
            alt="home cover 7"
            data-home-image="7"
          />
          <img
            src={'/images/book8.jpg'}
            alt="home cover 8"
            data-home-image="8"
          />
          <img
            src={'/images/book9.jpg'}
            alt="home cover 9"
            data-home-image="9"
          />
          <img
            src={'/images/book10.jpeg'}
            alt="home cover 10"
            data-home-image="10"
          />
          <img
            src={'/images/book11.jpg'}
            alt="home cover 11"
            data-home-image="11"
          />
          <img
            src={'/images/book12.jpeg'}
            alt="home cover 12"
            data-home-image="12"
          />
        </div>
      </div>
      <div className={styles['right-side']}>
        <h1>
          Find your next <span>book</span>
          <br />
          one random <span>pick</span> at a time
        </h1>
        <h2>
          Find yourself your next favorite read by look at one random book at a
          time
        </h2>
        <div className={styles.cta}>
          <Link to="/random-book">Explore books</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
