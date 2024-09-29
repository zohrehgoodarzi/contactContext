import { useContext, useState } from "react";
import { contactContext } from "../App";
import style from "../../css/contactList.module.css"
import UpdateForm from "./UpdateForm";






function ContactInfo({oneContact}) {
  const {deleteHandler,showCheckbox,checkHandler,check}=useContext(contactContext)
  const[modalDelete,setModalDelete]=useState(false);
 
  const[edit,setEdit]=useState(false)

  const editButton=(e)=>{
   setEdit(true);
  console.log(e.target)
   
  }

const deleteContact=()=>{
  setModalDelete(true)
}


  return (
  
    <tr className={style.contactInfo}>
    <td>{oneContact.fullName}</td>
    <td>{oneContact.email}</td>
    <td>{oneContact.job?oneContact.job:"شغلی وارد نشده است!"}</td>
    <td>{oneContact.tell}</td>
    <td>
     {showCheckbox?
      <input type="checkbox" name={oneContact.id} id={`contactCheck-${oneContact.id}`} className={style.checkbox} defaultChecked={check} onChange={(e)=>checkHandler(e,oneContact.id)}  />
         :""}

     <button type="submit" className={style.buttonFunctionDelete} onClick={deleteContact} >حذف</button>

     {modalDelete?<div className={style.modal}>
      <p>آیا از حذف مخاطب مطمین هستید؟</p>
      <button className={style.modaldeleteButton} onClick={()=>deleteHandler(oneContact.id)}>حذف قطعی</button>
      <button className={style.modalIgnoreButton} onClick={()=>setModalDelete(false)}>انصراف</button>
     </div>:""}
     <button className={style.buttonFunctionEdit} onClick={editButton}>ویرایش </button>
     {edit?<UpdateForm oneContact={oneContact} setEdit={setEdit}/>:""}
     </td>
  </tr>

  )
}

export default ContactInfo;