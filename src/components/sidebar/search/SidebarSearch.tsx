import SvgSearch02 from '../../icons/Search02';
import s from './SidebarSearch.module.css';


export default function SidebarSearch() {
  return (
    <div className={s.search_container}>
      <label htmlFor="search">
        <div className={s.search_input}>
          <SvgSearch02 variant='outline' />
          <input className="text-md-regular" type='search' id='search' name='search' placeholder='Search' />


        </div>
      </label>

    </div>
  )
}