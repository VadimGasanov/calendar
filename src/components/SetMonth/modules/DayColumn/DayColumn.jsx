import { useRef, useState, useEffect, useMemo } from "react"
import style from './DayColumn.module.css'
import TaskForm from "../TaskForm/TaskForm.jsx"
import MyButton from "../../../UI/MyBytton/MyButton.jsx"


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


const DayColumn = ({index, number, month, monthNumber, expenses, income, isDay, newProfit, payDelete, ...props}) => {
  const [tasks, setTasks] = useState([])
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState({height: '100%', width: '100%'})
  const ref = useRef()

  useEffect(() => {
    if(isDay){
      const node = ref.current
      node.addEventListener('mousemove', () => {
        setSize({height: '110%', width: '110%', zIndex: '10', left: '-5%', top: '-5%'})
      }, [])
      node.addEventListener('mouseleave', () => {
        setSize({height: '100%', width: '100%'})
      })
    }
  })



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

  return (
    <div className={style.container}>
      <div ref={ref} style={size} className={style.day}>

        {
          isDay?
            <div>
              <div className={style.day__number}>{number}</div>
              
              <div><span style={{color: 'red'}}>Расходы:</span> {sumExpenses}</div>

              <div><span style={{color: 'green'}}>Доход:</span> {sumIncome}</div>
              

              <div><span style={{color: `${sumIncome - sumExpenses < 0? 'red': 'green'}`}}>Итого:</span>
              {sumIncome - sumExpenses}</div>
        
              <MyButton onClick={() => setVisible(true)}>Изменить</MyButton>
        
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