import { useMemo, useState } from 'react';
import style from './App.css'
import SetDays from './components/SetMonth/SetMonth';

function App() {
  const year = useMemo(() => {
    return [{name: 'Январь', days: 31, firstDay: new Date('January 1, 2024').getDay()}, 
      {name: 'Февраль', days: 28, firstDay: new Date('Februar 1, 2024').getDay()},
      {name: 'Март', days: 31, firstDay: new Date('Marth 1, 2024').getDay()},
      {name: 'Апрель', days: 30, firstDay: new Date('April 1, 2024').getDay()},
      {name: 'Май', days: 31, firstDay: new Date('May 1, 2024').getDay()},
      {name: 'Июнь', days: 30, firstDay: new Date('June 1, 2024').getDay()},
      {name: 'Июль', days: 31, firstDay: new Date('Jule 1, 2024').getDay()},
      {name: 'Август', days: 31, firstDay: new Date('August 1, 2024').getDay()},
      {name: 'Сентябрь', days: 30, firstDay: new Date('September 1, 2024').getDay()},
      {name: 'Октябрь', days: 31, firstDay: new Date('October 1, 2024').getDay()},
      {name: 'Ноябрь', days: 30, firstDay: new Date('November 1, 2024').getDay()},
      {name: 'Декабрь', days: 31, firstDay: new Date('December 1, 2024').getDay()}]
    }, [])

  const [selectMonth, setSelectMonth] = useState(new Date().getMonth())

  const newDate = (nextMonth, lastNumber) => {
    if(nextMonth !== lastNumber){
      setSelectMonth(nextMonth)
    }
  }

  return (
    <div style={{width: '100%', overflow: 'hidden'}}>
      <SetDays year={year} selectMonth={selectMonth}></SetDays>
      
      <div className={'arrows'}>
        <div className={'arrowLeft'} onClick={() => newDate(selectMonth - 1, -1)}>#--</div>
        <div className={'arrowRight'} onClick={() => newDate(selectMonth + 1, 12)}>--#</div>
      </div>
    </div>
  );
}

export default App;