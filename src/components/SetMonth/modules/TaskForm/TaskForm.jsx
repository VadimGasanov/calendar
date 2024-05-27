import { useState, useEffect } from "react"
import style from "./TaskForm.module.css"
import FirstPage from "./FirstPage/FirstPage"
import SecondPage from "./SecondPage/SecondPage"
import ThirdPage from "./ThirdPage/ThirdPage"


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

const TaskForm = ({visible, setVisible, number, month, changed, remove, expenses, income}) => {
  const [selectPage, setSelectPage] = useState(0)
  const [history, setHistory] = useState([[], [], [], [], [], [], [], [], [], [], []])
  const [category, setCategory] = useState(0)
  const [section, setSection] = useState(1)

  useEffect(() => {
    if(localStorage.getItem(`${month}${number}historyStorage`)){
      setHistory(JSON.parse(localStorage.getItem(`${month}${number}historyStorage`)))
    }
  }, [])

  const modalClass = [style.modal]
  if(visible){
    modalClass.push(style.active)
  }


  const newPay = (sum, description) => {
    setVisible(false)
    
    if(sum !== 0 && sum !==''){
      changed(sum, section, category)
      
      if(section){
        const newHistory = history.slice(0, category).concat([[...history[category], [sum, description]]]).concat(history.slice(category + 1))
        setHistory(newHistory)
        localStorage.setItem(`${month}${number}historyStorage`, JSON.stringify(newHistory))
      } else{
        const newHistory = history.slice(0, category + 9).concat([[...history[category + 9], [sum, description]]]).concat(history.slice(category + 10))
        setHistory(newHistory)
        localStorage.setItem(`${month}${number}historyStorage`, JSON.stringify(newHistory))
      }
    }
    
    setSelectPage(0)
  }
  
  function deletePay(point){
    setVisible(false)

    remove(point, section, category)
    if(section){
      const newHistory = history.slice(0, category).concat([history[category].filter((el, index) => {
        return index !== point
      })]).concat(history.slice(category + 1))

      setHistory(newHistory)
      localStorage.setItem(`${month}${number}historyStorage`, JSON.stringify(newHistory))
    } else{
      const newHistory = history.slice(0, category + 9).concat([history[category + 9].filter((el, index) => {
        return index !== point
      })]).concat(history.slice(category + 10))

      setHistory(newHistory)
      localStorage.setItem(`${month}${number}historyStorage`, JSON.stringify(newHistory))
    }

    setSelectPage(0)
  }

  
  return(
    <div className={modalClass.join(' ')} onClick={(e) => {
      e.stopPropagation()
      setVisible(false)
      setSelectPage(0)}}>
        <div className={style.modal__window} onClick={(e) => e.stopPropagation()}>        
          <div className={style.close} onClick={() => setVisible(false)}></div>

          <div className={style.modal__container} style={{left: `${-100 * selectPage}%`}}>
            <FirstPage number={number} month={month} expenses={getSum(expenses)} income={getSum(income)} setNextPage={setSelectPage} setSection={setSection}/>

            <SecondPage expenses={expenses} income={income} setCategory={setCategory} section={section} setSelectPage={setSelectPage}/>

            <ThirdPage history={history} section={section} category={category} newPay={newPay} deletePay={deletePay} setSelectPage={setSelectPage} number={number} month={month} />
          </div>
        </div>
    </div>
  )
}

export default TaskForm