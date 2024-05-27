import { useMemo, useState } from 'react';
import style from './App.module.css'
import SetDays from './components/SetMonth/SetMonth';
import MyArrow from './components/UI/MyArrow/MyArrow';


const getYear = new Date().getFullYear()

function App() {
  const year = useMemo(() => {
    return [{name: 'Январь', days: 31, firstDay: new Date(`January 1, ${getYear}`).getDay()}, 
    {name: 'Февраль', days: 28, firstDay: new Date(`Februar 1, ${getYear}`).getDay()},
      {name: 'Март', days: 31, firstDay: new Date(`Marth 1, ${getYear}`).getDay()},
      {name: 'Апрель', days: 30, firstDay: new Date(`April 1, ${getYear}`).getDay()},
      {name: 'Май', days: 31, firstDay: new Date(`May 1, ${getYear}`).getDay()},
      {name: 'Июнь', days: 30, firstDay: new Date(`June 1, ${getYear}`).getDay()},
      {name: 'Июль', days: 31, firstDay: new Date(`Jule 1, ${getYear}`).getDay()},
      {name: 'Август', days: 31, firstDay: new Date(`August 1, ${getYear}`).getDay()},
      {name: 'Сентябрь', days: 30, firstDay: new Date(`September 1, ${getYear}`).getDay()},
      {name: 'Октябрь', days: 31, firstDay: new Date(`October 1, ${getYear}`).getDay()},
      {name: 'Ноябрь', days: 30, firstDay: new Date(`November 1, ${getYear}`).getDay()},
      {name: 'Декабрь', days: 31, firstDay: new Date(`December 1, ${getYear}`).getDay()}]
    }, [])

  const [selectMonth, setSelectMonth] = useState(new Date().getMonth())

  const newDate = (nextMonth, lastNumber) => {
    if(nextMonth !== lastNumber){
      setSelectMonth(nextMonth)
    }
  }

  return (
    <div style={{width: '100%', overflow: 'hidden'}}>
      <div className={style.container}>
        <SetDays year={year} selectMonth={selectMonth} key={`${getYear}main`}></SetDays>
        
        <div className={style.arrows}>
          <MyArrow onClick={() => newDate(selectMonth - 1, -1)} />
          <MyArrow onClick={() => newDate(selectMonth + 1, 12)} style={{transform: 'rotate(-90deg) scale(0.5, 0.6'}} />
        </div>

      </div>
    </div>
  );
}

export default App;