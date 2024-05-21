import { useEffect, useState } from "react"
import DayColumn from "./modules/DayColumn/DayColumn"


const SetMonth = ({year, selectMonth}) => {
  const [month, setMonth] = useState([])
  const [resultMonth, setResultMonth] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  
  useEffect(() => {
    if(localStorage.getItem('localResult')){
      setMonth(JSON.parse(localStorage.getItem('localMonth')))
      setResultMonth(JSON.parse(localStorage.getItem('localResult')))
    } else{
      let day = year.map(e => {
        let arr = [[], [], []]
        for(let i = 1; i <= e.days; i++){
          arr[0].push({number: i, month: e.name, expenses: [[], [], [], [], [], [], [], [], []], income: [[], []]})
        }
  
        
        let emptyPlace = e.firstDay === 0 ? 6 : e.firstDay - 1
        for(let i = 0; i < emptyPlace; i++){
          arr[1].push(i)
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
  }, [])

  const pay = (number, monthNumber, sum, section, category) => {
    let newResult

    if(sum === 0 || sum ===''){
      return 0
    }
    let newCost = [...month[monthNumber]]
    if(section){
      newCost[0][number].expenses[category].push(sum)
      newResult = resultMonth.slice(0, monthNumber)
                    .concat([Number(resultMonth[monthNumber]) - Number(sum)])
                    .concat(resultMonth.slice(monthNumber + 1))
    } else{
      newCost[0][number].income[category].push(sum)
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
    <div style={{position: "relative", marginLeft: '6%', width: '90%'}}>
      <div style={{display: 'flex', position: 'relative', left: `${-100 * selectMonth}%`, transition: '.2s'}}>
        {month.map((el, index) => {
          return (
            <div style={{width: '100%', flexShrink: '0', opacity: `${selectMonth === index ? 1 : 0}`, transition: '.2s'}}>
              <div style={{marginBottom: '20px', position: 'relative', left: '0'}}>{el[0][0].month}</div>
              
              <div style={{border: '1px solid gray'}}>
                <div style={{display: 'flex'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '0', width: '14.2857%', border: '1px solid gray', height: '30px'}}>Понедельник</div>

                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '0', width: '14.2857%', border: '1px solid gray', height: '30px'}}>Вторник</div>

                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '0', width: '14.2857%', border: '1px solid gray', height: '30px'}}>Среда</div>

                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '0', width: '14.2857%', border: '1px solid gray', height: '30px'}}>Четверг</div>

                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '0', width: '14.2857%', border: '1px solid gray', height: '30px'}}>Пятница</div>

                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '0', width: '14.2857%', border: '1px solid gray', height: '30px'}}>Суббота</div>

                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: '0', width: '14.2857%', border: '1px solid gray', height: '30px'}}>Воскресенье</div>
                </div>

                <div style={{display: "flex", flexWrap: 'wrap'}}>
                  {el[1].map(e => {
                    return(
                      <DayColumn isDay={false}>
                    </DayColumn>)}
                  )}

                  {el[0].map(e => {
                    return(
                      <DayColumn index={index} number={e.number} monthNumber={index} month={e.month} expenses={e.expenses} income={e.income} isDay={true} newProfit={pay} payDelete={payRemove} key={`${e.number}${e.month}`}>
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

              <div>Итого за месяц: {resultMonth[index]}</div>
            </div>)
        })}
      </div>
    </div>
  )
}

export default SetMonth