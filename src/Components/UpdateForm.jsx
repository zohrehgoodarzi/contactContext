import React, { useContext, useEffect, useState } from 'react'
import style from "../../css/form.module.css"
import { contactContext } from '../App';
import updateInfo from '../helpers/updateInfo';
import checkEmail from '../helpers/checkEmail';

function UpdateForm({oneContact,setEdit}) {

 const {validateField,setValidateField,changeHandler,ignoreHandler,setIsShow}=useContext(contactContext);


    const[modal,setModal]=useState(false);
   
    useEffect(()=>{
     
    },[])
    const editHandler=()=>{


        !oneContact.fullName?(setValidateField((alertText)=>({...alertText,fullName:"واردکردن نام ونام خانوادگی اجباریست"}))):(oneContact.fullName.length<=5)?(setValidateField((alertText)=>({...alertText,fullName:"واردکردن حداقل 5حرف نام ونام خانوادگی اجباریست"}))):""
    
    
    
        //validation email
        if(!oneContact.email || checkEmail(oneContact.email)){
          setValidateField((alertText)=>({...alertText,email:"لطفا ایمیل خود را وارد کنید"}));
          
        }
        
        
        //validation tell
        if(!oneContact.tell){
          setValidateField((alertText)=>({...alertText,tell:"لطفا شماره همراه خود را وارد کنید"}));
         }
        else if(oneContact.tell.length<=10 ){
        setValidateField((alertText)=>({...alertText,tell:"شماره تلفن همراه بایستی11رقم باشد"}));
        return  ;
        }
        
        else{
          setModal(true)
        };
    }
    const [contact,setContact]=useState({
     
      fullName:"",
      email:"",
      job:"",
      tell:""
    });
    
    
    
    
    
 const [fullName,setFullName]=useState(oneContact.fullName);
 const [email,setEmail]=useState(oneContact.email);
const[job,setJob]=useState(oneContact.job);
const[tell,setTell]=useState(oneContact.tell);

const changehandler=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
 if( name==="fullName"){setFullName(value); oneContact.fullName=value}
  if(name==="email"){setEmail(value) ;oneContact.email=value}
 if(name==="job"){setJob(value); oneContact.job=value}
  if(name==="tell"){setTell(value) ;oneContact.tell=value}
}

const editHandlerButton=(e)=>{
  updateInfo(oneContact,oneContact.id);
  setModal(false);
}
  return (
     
    <div>
        <div className={style.container}>
      <span onClick={()=>{ignoreHandler();setEdit(false)}} className={style.cross}>x</span>
    <form action="#" onSubmit={(e)=>e.preventDefault()}>
   <div>
   <label htmlFor="fullNamee">نام ونام خانوادگی:</label>
   <input type="text" name="fullName" id="fullNamee" value={fullName}  onChange={changehandler}/>
   <p>{validateField.fullName}</p> 
   </div>
   <div>
   <label htmlFor="Email">ایمیل:</label>
   <input type="text" name="email" id="Email" value={email }  onChange={changehandler} />
     <p>{validateField.email}</p> 
   </div>

    <div>
   <label htmlFor="joB">شغل</label>
   <input type="text" name="job" id="joB" value={job}  onChange={changehandler} />
   </div>
   <div>
   <label htmlFor="phone">تلفن همراه:</label>
   <input type="number" name="tell" id="phone"  value={tell}  onChange={changehandler}/>
    <p>{validateField.tell}</p>
    </div>
   <button type="submit" onClick={editHandler} className={style.button}>ویرایش مخاطب</button>
   {modal?<div className={style.modal}>
    <p>مخاطب ویرایش شود؟</p>
  <button  type="submit" onClick={editHandlerButton} className={style.accept}>تایید</button>
   <button onClick={()=>{  setModal(false)}} className={style.ignore}>لغو</button> 
   </div>:""}
    
   </form>

   </div>

    </div>
  )
}

export default UpdateForm