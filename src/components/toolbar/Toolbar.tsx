import styles from './Toolbar.module.css';

type ToolbarProps = {
  title: string;
  search: string;
  onSearchChange: (v: string) => void;
  onActionClick?: () => void;

}


export default function Toolbar({
  title,
  search,
  onSearchChange,
  onActionClick,
}: ToolbarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.barLeft}>
        <div className={styles.iconBox} aria-hidden="true">
          <div className={styles.iconSquare} />
        </div>
        <p id="recent-transactions-title" className='text-lg-md'>
          {title}
        </p>
      </div>

      {/* <div className={styles.controls}>
        <label className={styles.searchLabel}>
          <span className={styles.searchIcon} aria-hidden="true">
            <span className={styles.searchGlyph} />
          </span>
          <input
            className={styles.searchInput}
            placeholder="Search transactions"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search transactions"
          />
        </label>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Actions"
          onClick={onActionClick}
        >
          <span className={styles.iconBoxSmall} aria-hidden="true">
            <span className={styles.iconSquareSmall} />
          </span>
        </button>
      </div> */}
    </div>
  );
}