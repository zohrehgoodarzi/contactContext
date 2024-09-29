import { useContext, useState } from "react"
import { contactContext } from "../App"
import ContactInfo from "./ContactInfo";
import style from "../../css/contactList.module.css"

function ContactsList() {
    const{contact}=useContext(contactContext);

  


  
  return (
    <>

    <table className={style.container}>
    <thead >
      <tr className={style.thead}>
        <th>نام ونام خانوادگی</th>
        <th>ایمیل</th>
        <th>شغل</th>
        <th>تلفن همراه</th>
        <th> عملیات</th>
      </tr>
    </thead>
    <tbody>
      {contact?.map((oneContact)=>(
        

          <ContactInfo key={oneContact.id} oneContact={oneContact} />
        
      ))}
      
    </tbody>
   </table>
   </>
  )
}

export default ContactsList