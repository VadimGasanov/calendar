import { useRef, useState, useEffect, useMemo } from "react"
import style from './DayColumn.module.css'
import TaskForm from "../TaskForm/TaskForm.jsx"


function getSum(arr){
  try{
    return arr.reduce((acc, item) => {
      return Number(acc) + (typeof(item) === 'string' || typeof(item) === 'number' ? Number(item): getSum(item)) 
    }, 0)
  }
  catch{
    return 0
  }
}


const DayColumn = ({number, month, monthNumber, expenses, income, isDay, newProfit, payDelete, selectMonth, today, ...props}) => {
  const [tasks, setTasks] = useState([])
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState({height: '100%', width: '100%'})
  const ref = useRef()


  const sumExpenses = useMemo(() => {
    return getSum(expenses)
  }, [String(expenses)])

  const sumIncome = useMemo(() => {
    return getSum(income)
  }, [String(income)])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask.current.value])
  }

  const newPay = (sum, section, category) => {
    newProfit(number - 1, monthNumber, sum, section, category)
  }

  const removePay = (point, section, category) => {
    payDelete(number - 1, monthNumber, point, section, category)
  }

  const classContainer = [style.container]
  if(!selectMonth){
    classContainer.push(style.disactive)
  }

  
  return (
      <div onClick={() =>{
        if(selectMonth){
          setVisible(true)
        } 
      } 
      } className={classContainer.join(' ')}>
      <div ref={ref} style={size} className={style.day}>
        {
          isDay?
            <div>
              <div className={style.day__number}>
                <div className={style.day__number_container}
                 style={today === 1 ? {backgroundColor: '#ff6565', color: '#fff'}
                 : 
                 today === 2? {color: '#ff6565'} 
                 :
                 today === -2? {opacity: '.4', color: '#ff6565'}
                 :
                 today === -1? {opacity: '.4'} : {}}>
                  {number} <div className={style.day__number_after} style={!Boolean(expenses.join('')) && !Boolean(income.join(''))? {display: 'none'}: {}}></div>
                </div>
              </div>
        
              <TaskForm visible={visible} setVisible={setVisible} number={number} month={month} addTask={addTask} changed={newPay} expenses={expenses} income={income} remove={removePay}/>
            </div>
            :
            <div></div>
        }
      </div>
    </div>
  )
}

export default DayColumn