
import styles from './Logo.module.css';
import Icon from '../icon/Icon';
import PiggyBank01 from '../../icons/PiggyBank01';



export default function Logo() {
  return (
    <div className={styles.logo_container} aria-label="Quicken Logo">
      <Icon color='white' glyph={PiggyBank01} role='img' />
    </div>

  )
}