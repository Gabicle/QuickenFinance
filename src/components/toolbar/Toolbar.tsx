import styles from './Toolbar.module.css';

type ToolbarProps = {
  title: string;
};

export default function Toolbar({ title }: ToolbarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.barLeft}>
        <div className={styles.iconBox} aria-hidden="true">
          <div className={styles.iconSquare} />
        </div>
        <p id="recent-transactions-title" className="text-md-md">
          {title}
        </p>
      </div>
    </div>
  );
}
