import Card from "../components/card/Card";
import s from '../components/card/Card.module.css'
import SvgCoinsStacked03 from "../components/icons/CoinsStacked03";


export default function DashboardCard() {
  return (
    <Card
      header={
        <>
          <span>Total Income</span>
          <div className={s.iconContainer}>
            <SvgCoinsStacked03
              variant="outline" color="purple" />
          </div>
        </>
      }
      content={<span>$3,928.41</span>}
      footer={
        <>
          <span className={s.badge}>+12,8%</span>
          <span className={s.caption}>+$284 from last month</span>
        </>
      } />
  )
}