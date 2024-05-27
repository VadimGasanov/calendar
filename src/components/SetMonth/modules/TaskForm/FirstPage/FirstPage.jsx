import style from './FirstPage.module.css'

const FirstPage = ({number, month, expenses, income, setNextPage, setSection}) => {

  return (
    <div className={style.firstPage} onClick={(e) => e.stopPropagation()}>
      <div className={style.firstPage__date}>
        <div className={style.firstPage__number}>{number}</div>

        <div className={style.firstPage__month}>
          {month.toLowerCase() === "август"|| month.toLowerCase() === "март"?
           month + "а" : month.slice(0, -1) + "я"}
        </div>
      </div>

      <div className={style.firstPage__item}>
        <div className={style.firstPage__column}>
          <div className={style.firstPage__cell}>Расходы: {expenses}</div>

          <button onClick={() => {
            setNextPage(1)
            setSection(1)
          }} className={style.firstPage__add}>Добавить</button>
        </div>
        
        <div className={style.firstPage__column}>
          <div className={style.firstPage__cell}>Доход: {income}</div>
        
          <button onClick={() => {
            setNextPage(1)
            setSection(0)
          }} className={style.firstPage__add}>Добавить</button>
        </div>
        
        <div className={style.firstPage__cell}>Результат: {income - expenses}₽</div>
      </div>
    </div>
  )
}

export default FirstPage