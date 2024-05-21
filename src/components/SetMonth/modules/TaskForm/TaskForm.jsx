import { useEffect, useMemo, useState } from 'react'
import style from './TaskForm.module.css'
import MyInput from '../../../UI/Input/MyInput'
import MyButton from '../../../UI/MyBytton/MyButton'


function getSum(arr){
  return arr.reduce((acc, item) => {
    return Number(acc) + Number(item)
  })
}


const TaskForm = ({visible, setVisible, number, month, changed, remove, expenses, income}) => {
  const [category, setCategory] = useState()
  const [section, setSection] = useState(1)
  const [blank, setBlank] = useState(false)
  const [sum, setSum] = useState('')
  const [description, setDescription] = useState('')
  const [history, setHistory] = useState([[], [], [], [], [], [], [], [], [], [], []])

  const list = useMemo(() => {
    return ([
    'Продукты',
    'Кафе',
    'Досуг',
    'Транспорт',
    'Здоровье',
    'Подарки',
    'Семья',
    'Покупки',
    'Другое',
    
    'Зарплата',
    'Другое'
    ])
  }, [])

  useEffect(() => {
    if(localStorage.getItem(`${month}${number}historyStorage`)){
      setHistory(JSON.parse(localStorage.getItem(`${month}${number}historyStorage`)))
    }
  }, [])

  const modalClass = [style.modal]
  if(visible){
    modalClass.push(style.active)
  }

  const newPay = () => {
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
    
    setSum('')
    setDescription('')
    setTimeout(() => setBlank(false), 10)
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
    
    setSum('')
    setDescription('')
    setTimeout(() => setBlank(false), 10)
  }
  
  const sumInput = (number) => {
    setCategory(number)
    setBlank(true)
  }


  return (
    <div className={modalClass.join(' ')} onClick={() => setVisible(false)}>
      <div className={style.modal__window} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__windowFirst}>
          <div className={style.modal__btn}>
            <button className={style.btn} onClick={e => setSection(1)}>Расходы</button>

            <button className={style.btn} onClick={e => setSection(0)}>Доход</button>
          </div>

          <div className={style.close} onClick={() => setVisible(false)}></div>

          <div style={{width: '98%', margin: '0 auto'}}>
            {
              section?
              <div style={{marginTop: '45px'}}>
                <div onClick={() => sumInput(0)} className={style.history__cell}>Продукты: {expenses[0].length === 0? 0: getSum(expenses[0])}</div>
                
                <div onClick={() => sumInput(1)} className={style.history__cell}>Кафе: {expenses[1].length === 0? 0: getSum(expenses[1])}</div>
                
                <div onClick={() => sumInput(2)} className={style.history__cell}>Досуг: {expenses[2].length === 0? 0: getSum(expenses[2])}</div>
                
                <div onClick={() => sumInput(3)} className={style.history__cell}>Транспорт: {expenses[3].length === 0? 0: getSum(expenses[3])}</div>
                
                <div onClick={() => sumInput(4)} className={style.history__cell}>Здоровье: {expenses[4].length === 0? 0: getSum(expenses[4])}</div>
                
                <div onClick={() => sumInput(5)} className={style.history__cell}>Подарки: {expenses[5].length === 0? 0: getSum(expenses[5])}</div>
                
                <div onClick={() => sumInput(6)} className={style.history__cell}>Семья: {expenses[6].length === 0? 0: getSum(expenses[6])}</div>
                
                <div onClick={() => sumInput(7)} className={style.history__cell}>Покупки: {expenses[7].length === 0? 0: getSum(expenses[7])}</div>
                
                <div onClick={() => sumInput(8)} className={style.history__cell}>Другое: {expenses[8].length === 0? 0: getSum(expenses[8])}</div>
              </div>
              :
              <div style={{marginTop: '45px'}}>
                <div onClick={() => sumInput(0)} className={style.history__cell}>Зарплата: {income[0].length === 0? 0: getSum(income[0])}</div>
                
                <div onClick={() => sumInput(1)} className={style.history__cell}>Другое: {income[1].length === 0? 0: getSum(income[1])}</div>
              </div>
            }
          </div>

          {blank? 
            <div onClick={() => setBlank(false)} className={style.enter}>
              <div onClick={e => e.stopPropagation()} className={style.enter__window}>
                <div style={{padding: '30px 40px'}}>
                  <div className={style.modal__title}>Введите сумму для категории {section ? list[category].toLowerCase(): list[category + 9].toLowerCase()}</div>

                  <div style={{marginBottom: '20px'}}>
                    <MyInput
                    type='text'
                    value={sum}
                    onChange={(e) => {
                      if(isFinite(Number(e.target.value))) {
                        setSum(e.target.value)
                      }
                    }}/>
                    
                    <div className={style.modal__subtitle}>Введите описание(необязательно)</div>

                    <MyInput
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>

                    <MyButton
                    className={style.sumBtn}
                    onClick={() => {newPay()}}>Применить</MyButton>
                  </div>

                  <div className={style.history__container}>
                    {section? history[category].map((e, index) => {
                      return (
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'10px'}} key={`${Date.now()}${number}${month}${index}`}>
                          <div style={{maxWidth: '60%'}}>
                            <div style={{marginBottom: '5px', fontSize: '18px'}}>{e[0]}</div>

                            <div>{e[1]}</div>
                          </div>

                          <button 
                          onClick={() => deletePay(index)}
                          className={style.modal__buttonRemove}>Удалить</button>
                        </div>)
                      })
                    : 
                    history[category + 9].map((e, index) => {
                      return (
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'10px'}} key={`${Date.now()}${number}${month}${index}`}>
                          <div style={{maxWidth: '60%'}}>
                            <div style={{marginBottom: '5px', fontSize: '18px'}}>{e[0]}</div>

                            <div>{e[1]}</div>
                          </div>

                          <button 
                          onClick={() => deletePay(index)}
                          className={style.modal__buttonRemove}>Удалить</button>
                        </div>)
                    })}
                  </div>
                </div>
              </div>
            </div>
            :
            <></>
          }
        </div>
      </div>
    </div>
  )
}

export default TaskForm