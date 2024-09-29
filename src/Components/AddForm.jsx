import { useContext, useReducer, useState } from "react";
import { contactContext } from "../App";
import checkEmail from "../helpers/checkEmail"
import style from "../../css/form.module.css"




function AddForm() {
 const {contactOne,ignoreHandler,validateField,setValidateField,addHandlerButton,changeHandler,setIsShow,isShow}=useContext(contactContext);
    
const [modal,setModal]=useState(false)

 const addHandler=()=>{
 
  //validation fullName

!contactOne.fullName?(setValidateField((alertText)=>({...alertText,fullName:"واردکردن نام ونام خانوادگی اجباریست"}))):(contactOne.fullName.length<=5)?(setValidateField((alertText)=>({...alertText,fullName:"واردکردن حداقل 5حرف نام ونام خانوادگی اجباریست"}))):""



//validation email
if(!contactOne.email || checkEmail(contactOne.email)){
  setValidateField((alertText)=>({...alertText,email:"لطفا ایمیل خود را وارد کنید"}));
  
}
// else if(checkEmail(contactOne.email)){
//   setValidateField((alertText)=>({...alertText,email:"لطفا ایمیل خود رابه شکل صحیح وارد کنید"}));
 
// }

//validation tell
if(!contactOne.tell){
  setValidateField((alertText)=>({...alertText,tell:"لطفا شماره همراه خود را وارد کنید"}));
 }
else if(contactOne.tell.length<=10 ){
setValidateField((alertText)=>({...alertText,tell:"شماره تلفن همراه بایستی11رقم باشد"}));
return  ;
}

else{
  setModal(true)
}


}



  return (
    <div className={style.container}>
      <span onClick={()=>{ignoreHandler();setIsShow(false)}} className={style.cross}>x</span>
    <form action="#" onSubmit={(e)=>e.preventDefault()}>
   <div>
   <label htmlFor="fullNamee">نام ونام خانوادگی:</label>
   <input type="text" name="fullName" id="fullNamee" value={contactOne.fullName} onChange={changeHandler}/>
   <p>{validateField.fullName}</p> 
   </div>
   <div>
   <label htmlFor="Email">ایمیل:</label>
   <input type="text" name="email" id="Email" value={contactOne.email} onChange={changeHandler} />
     <p>{validateField.email}</p> 
   </div>

    <div>
   <label htmlFor="joB">شغل</label>
   <input type="text" name="job" id="joB" value={contactOne.job} onChange={changeHandler}/>
   </div>
   <div>
   <label htmlFor="phone">تلفن همراه:</label>
   <input type="number" name="tell" id="phone"  value={contactOne.tell} onChange={changeHandler}/>
    <p>{validateField.tell}</p>
    </div>
    <div>
   <button type="submit" onClick={addHandler} className={style.button}>افزودن مخاطب</button>
    </div>
   {modal?<div className={style.modal}>
    <p>مخاطب اضافه شود؟</p>
  <button  type="submit" onClick={addHandlerButton} className={style.accept}>تایید</button>
   <button onClick={()=>{  setModal(false)}} className={style.ignore}>لغو</button> 
   </div>:""}
    
   </form>

   </div>
  )
}

export default AddForm;