import arrow from "../../../images/arrow.png"
import style from "./MyArrow.module.css"

const MyArrow = (props) => {

  return (
    <div {...props} className={style.arrow}>
      <img src={arrow}></img>
    </div>
  )
}

export default MyArrow