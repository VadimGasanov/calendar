import style from "./SecondPage.module.css"
import MyArrow from "../../../../UI/MyArrow/MyArrow"

function getSum(arr){
  return arr.reduce((acc, item) => {
    return Number(acc) + Number(item)
  })
}

const SecondPage = ({expenses, income, setCategory, section, setSelectPage}) => {
  const setNextPage = (category) => {
    setCategory(category)
    setSelectPage(2)
  }

  return (
    <div className={style.modal__windowSecond}>
      <div onClick={() => setSelectPage(0)} className={style.modalSecond__return}>
        <MyArrow />
      </div>

      <div style={{width: '98%', margin: '0 auto'}}>
        {
          section?
          <div style={{marginTop: '45px'}}>
            <div onClick={() => setNextPage(0)} className={style.history__cell}>Продукты: {expenses[0].length === 0? 0: getSum(expenses[0])}</div>
            
            <div onClick={() => setNextPage(1)} className={style.history__cell}>Кафе: {expenses[1].length === 0? 0: getSum(expenses[1])}</div>
            
            <div onClick={() => setNextPage(2)} className={style.history__cell}>Досуг: {expenses[2].length === 0? 0: getSum(expenses[2])}</div>
            
            <div onClick={() => setNextPage(3)} className={style.history__cell}>Транспорт: {expenses[3].length === 0? 0: getSum(expenses[3])}</div>
            
            <div onClick={() => setNextPage(4)} className={style.history__cell}>Здоровье: {expenses[4].length === 0? 0: getSum(expenses[4])}</div>
            
            <div onClick={() => setNextPage(5)} className={style.history__cell}>Подарки: {expenses[5].length === 0? 0: getSum(expenses[5])}</div>
            
            <div onClick={() => setNextPage(6)} className={style.history__cell}>Семья: {expenses[6].length === 0? 0: getSum(expenses[6])}</div>
            
            <div onClick={() => setNextPage(7)} className={style.history__cell}>Покупки: {expenses[7].length === 0? 0: getSum(expenses[7])}</div>
            
            <div onClick={() => setNextPage(8)} className={style.history__cell}>Другое: {expenses[8].length === 0? 0: getSum(expenses[8])}</div>
          </div>
          :
          <div style={{marginTop: '45px'}}>
            <div onClick={() => setNextPage(0)} className={style.history__cell}>Зарплата: {income[0].length === 0? 0: getSum(income[0])}</div>
            
            <div onClick={() => setNextPage(1)} className={style.history__cell}>Другое: {income[1].length === 0? 0: getSum(income[1])}</div>
          </div>
        }
      </div>
    </div>
  )
}

export default SecondPage