import cl from './MyInput.module.css'

const MyInput = (props) => {


  return (
    <input {...props} 
    className={cl.input}/>
  )
}

export default MyInput