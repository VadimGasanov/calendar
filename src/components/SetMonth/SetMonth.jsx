import { useEffect, useMemo, useState } from "react"
import DayColumn from "./modules/DayColumn/DayColumn"
import style from './SetMonth.module.css'


const SetMonth = ({year, selectMonth}) => {
  const [month, setMonth] = useState([])
  const [resultMonth, setResultMonth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  
  useEffect(() => {
    if(localStorage.getItem('localResult')){
      setMonth(JSON.parse(localStorage.getItem('localMonth')))
      setResultMonth(JSON.parse(localStorage.getItem('localResult')))
    } else{
      let day = year.map(e => {               //Первый элемент массива отвечает за создание пустых ячеек перед началом самих дней для выравнивания по дням недели
        let arr = [[], [], []]                //Второй элемент-- сами дни.  Третий элемент заполняет оставшееся пространство

        let emptyPlace = e.firstDay === 0 ? 6 : e.firstDay - 1
        for(let i = 0; i < emptyPlace; i++){
          arr[1].push(i)
        }

        for(let i = 1; i <= e.days; i++){
          arr[0].push({number: i, month: e.name, expenses: [[], [], [], [], [], [], [], [], []], income: [[], []], emptyDays: emptyPlace})
        }
        
        let fullCell = e.days + emptyPlace
        emptyPlace = Math.ceil(fullCell / 7) * 7 - fullCell
        for(let i = 0; i < emptyPlace; i++){
          arr[2].push(i)
        }

        return arr
      })
      setMonth(day)
    }
  }, [year])

  const today = useMemo(() => {
     return [new Date().getMonth(), new Date().getDate()]
  }, [])

  const pay = (number, monthNumber, sum, section, category) => {            //Функция добавляет новую денежную операцию в month и сохраняет значение  localStorage
    let newResult

    if(sum === 0 || sum ===''){
      return 0
    }
    let newCost = [...month[monthNumber]]
    if(section){
      newCost[0][number].expenses[category].push(Number(sum))
      newResult = resultMonth.slice(0, monthNumber)
                    .concat([Number(resultMonth[monthNumber]) - Number(sum)])
                    .concat(resultMonth.slice(monthNumber + 1))
    } else{
      newCost[0][number].income[category].push(Number(sum))
      newResult = resultMonth.slice(0, monthNumber)
                    .concat([Number(resultMonth[monthNumber]) + Number(sum)])
                    .concat(resultMonth.slice(monthNumber + 1))
    }
    const newMonth = month.slice(0, monthNumber).concat([newCost]).concat(month.slice(monthNumber + 1))
    setMonth(newMonth)
    setResultMonth(newResult)
    localStorage.setItem('localMonth', JSON.stringify(newMonth))
    localStorage.setItem('localResult', JSON.stringify(newResult))
  }

  const payRemove = (number, monthNumber, point, section, category) => {
    const day = month[monthNumber][0][number]
    let newResult

    if(section){
      newResult = resultMonth.map((el, index) => {
        if(index !== monthNumber) {
          return el
        }
        return el + Number(day.expenses[category][point])
      })
      
      day.expenses[category] = day.expenses[category].filter((el, index) => index !== point)
    } else{
        newResult = resultMonth.map((el, index) => {
        if(index !== monthNumber) {
          return el
        }
        return el - Number(day.income[0][point])
      })
      
      day.income[category] = day.income[category].filter((el, index) => index !== point)
    }
    
    const newMonth = month.map((el, index) => {
      if(index !== monthNumber){
        return el
      }
      return el.map((e, ind) =>{
        if(ind !== number){
          return e
        }
        return [day]
      })
    })
    
    setMonth(newMonth)
    setResultMonth(newResult)
    localStorage.setItem('localMonth', JSON.stringify(newMonth))
    localStorage.setItem('localResult', JSON.stringify(newResult))
  }

  return (
    <div className={style.setMonth}>
      <div style={{display: 'flex', position: 'relative', left: `${-100 * selectMonth}%`, transition: '.2s'}}>
        {month.map((el, index) => {
          return (
            <div style={{maxWidth: '100%', flexShrink: '0', opacity: `${selectMonth === index ? 1 : 0}`, transition: '.2s'}} key={`${index}${el.month}setMonth`}>
              <div className={style.setMonth__monthName}>{el[0][0].month}</div>
              
              <div className={style.setMonth__container}>
                <div style={{display: 'flex', marginBottom: '20px'}}>
                  <div className={style.setMonth__weekDay}>Пн</div>

                  <div className={style.setMonth__weekDay}>Вт</div>

                  <div className={style.setMonth__weekDay}>Ср</div>

                  <div className={style.setMonth__weekDay}>Чт</div>

                  <div className={style.setMonth__weekDay}>Пт</div>

                  <div className={style.setMonth__weekDay} style={{color: '#ff6565'}}>Сб</div>

                  <div className={style.setMonth__weekDay} style={{color: '#ff6565'}}>Вс</div>
                </div>

                <div className={style.setMonth__dayContainer}>
                  {el[1].map(e => {
                    return(
                      <DayColumn isDay={false}>
                    </DayColumn>)}
                  )}

                  {el[0].map(e => {
                    if(e.number === today[1] && index === today[0]){
                      return (
                      <DayColumn number={e.number} monthNumber={index} month={e.month} expenses={e.expenses}
                       income={e.income} isDay={true} newProfit={pay} payDelete={payRemove} selectMonth={selectMonth === index} today={1} key={`${e.number}${e.month}`} />
                      )
                    } else if(((e.emptyDays + e.number) % 7 === 0) || ((e.emptyDays + e.number) % 7 === 6)){
                      if(index < today[0] || (e.number < today[1] && index <= today[0])){
                        return (
                          <DayColumn number={e.number} monthNumber={index} month={e.month} expenses={e.expenses}
                          income={e.income} isDay={true} newProfit={pay} payDelete={payRemove} selectMonth={selectMonth === index} today={-2} key={`${e.number}${e.month}`} />
                        )
                      }
                       return(
                        <DayColumn number={e.number} monthNumber={index} month={e.month} expenses={e.expenses}
                         income={e.income} isDay={true} newProfit={pay} payDelete={payRemove} selectMonth={selectMonth === index} today={2} key={`${e.number}${e.month}`} />
                        )
                      } else if(index < today[0] || (e.number < today[1] && index <= today[0])){
                       return (
                        <DayColumn number={e.number} monthNumber={index} month={e.month} expenses={e.expenses}
                         income={e.income} isDay={true} newProfit={pay} payDelete={payRemove} selectMonth={selectMonth === index} today={-1} key={`${e.number}${e.month}`}/>
                       )
                      }
                    return(
                      <DayColumn number={e.number} monthNumber={index} month={e.month} expenses={e.expenses}
                       income={e.income} isDay={true} newProfit={pay} payDelete={payRemove} selectMonth={selectMonth === index} today={0} key={`${e.number}${e.month}`}>
                      </DayColumn>
                    )}
                  )}

                  {el[2].map(e => {
                    return(
                      <DayColumn isDay={false}>
                    </DayColumn>)}
                  )}
                </div>
              </div>

              <div className={style.setMonth__result}>Итого за месяц: {resultMonth[index]}</div>
            </div>)
        })}
      </div>
    </div>
  )
}

export default SetMonth