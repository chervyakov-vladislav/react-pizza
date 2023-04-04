import styles from './style.module.scss';

const NotFoundBlock = () => {
  return (
    <div className="container">
      <div className={styles.root}>
        <h1>
          <span>😕</span>
          <br />
          Ничего не найдено
        </h1>
        <p className={styles.description}>
          К сожалению данная страница отсутствует в нашем интернет-магазине
        </p>
      </div>
    </div>
  );
};

export default NotFoundBlock;
