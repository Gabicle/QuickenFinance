import styles from './Pagination.module.css'

type PaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  isFetching?: boolean;
}

export default function Pagination({ page, totalPages, onPrev, onNext, isFetching }: PaginationProps) {

  return (
    <div className={styles.pager} role="navigation" aria-label="Transactions pagination">
      <button
        type="button"
        className={styles.iconButton}
        onClick={onPrev}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      <span className={styles.pageMeta} aria-live="polite">
        Page {page} / {Math.max(1, totalPages)}
      </span>

      <button
        type="button"
        className={styles.iconButton}
        onClick={onNext}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        ›
      </button>

      {isFetching && (
        <span className={styles.refreshNote} aria-live="polite">
          Refreshing…
        </span>
      )}
    </div>);

}