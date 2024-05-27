import { useState, useEffect } from "react"
import style from "./ThirdPage.module.css"
import MyArrow from "../../../../UI/MyArrow/MyArrow"
import MyInput from "../../../../UI/Input/MyInput"

const list = [
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
]

const ThirdPage = ({history, section, category, newPay, deletePay, setSelectPage, number, month}) => {
  const [sum, setSum] = useState('')
  const [description, setDescription] = useState('')

  const add = () => {
    if(sum !== 0 && sum !==''){
      newPay(sum, description)
    }
    setSum('')
    setDescription('')
  }
  
  function remove(point){
    deletePay(point)
    
    setSum('')
    setDescription('')
  }

  return (
    <div className={style.thirdPage}>      
      <div onClick={() => setSelectPage(1)} className={style.modalThird__return}>
        <MyArrow />
      </div>

      <div onClick={e => e.stopPropagation()} className={style.thirdPage__container}>
        <div className={style.thirdPage__form}>
          <div className={style.modal__title}>Введите сумму для категории {section ? list[category].toLowerCase(): list[category + 9].toLowerCase()}</div>

          <MyInput
          className={style.thirdPage__input}
          style={{border: 'none', marginBottom: '15px'}}
          type='text'
          value={sum}
          onChange={(e) => {
            if(isFinite(Number(e.target.value))) {
              setSum(e.target.value)
            }
          }}/>
          
          <div className={style.thirdPage__subtitle}>Введите описание(необязательно)</div>

          <MyInput
          className={style.thirdPage__input}
          style={{border: 'none', marginBottom: '20px'}}
          type='text'
          value={description}
          onChange={e => setDescription(e.target.value)}/>

          <button
          className={style.modalThird__button}
          onClick={add}>Применить</button>
        </div>

        <div className={style.history__container}>
          {section? history[category].map((e, index) => {
            return (
              <div className={style.thirdPage__history} key={`${Date.now()}${number}${month}${index}`}>
                <div style={{maxWidth: '60%'}}>
                  <div className={style.thirdPage__sum}>{e[0]}</div>

                  <div className={style.thirdPage__description}>{e[1]}</div>
                </div>

                <button 
                onClick={() => remove(index)}
                className={style.modal__buttonRemove}>Удалить</button>
              </div>)
            })
          : 
          history[category + 9].map((e, index) => {
            return (
              <div className={style.thirdPage__history} key={`${Date.now()}${number}${month}${index}`}>
                <div style={{maxWidth: '60%'}}>
                  <div className={style.thirdPage__sum}>{e[0]}</div>

                  <div className={style.thirdPage__description}>{e[1]}</div>
                </div>

                <button 
                onClick={() => remove(index)}
                className={style.modal__buttonRemove}>Удалить</button>
              </div>)
          })}
        </div>
      </div>
    </div>
  )
}

export default ThirdPage