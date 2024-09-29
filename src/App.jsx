import { createContext, useEffect, useReducer, useState } from "react";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { getContacts } from "./services/getContacts";
import addContact from "../public/addContact.jpg"
import AddForm from "./Components/AddForm";
import ContactsList from "./Components/ContactsList";
import fetchinfo from "./helpers/fetchInfo";
import Search from "./Components/Search";
import checkEmail from "./helpers/checkEmail";
import style from "../css/index.module.css";
import UpdatePost from "./helpers/updateInfo";

export  const contactContext=createContext();

function App() {
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(false);
  const [contact,setContact]=useState([]);
  const [contactOne,setContactOne]=useState({
    id:"",
    fullName:"",
    email:"",
    job:"",
    tell:""});
 
   const [validateField,setValidateField]=useState({
      fullName:"",
      email:"",
      job:"",
      tell:"",
   }
  
   );

  const [isShow,setIsShow]=useState(false);

  const [search,setSearch]=useState("");
  
  const[showCheckbox,setShowCheckBox]=useState(false);
  const[ids,setIds]=useState([]);
  const [check,setCheck]=useState(false)

 





  useEffect(()=>{
    const controller=new AbortController()
    setIsLoading(true)
    const fetchData=async()=>{
      try {
       const data=await fetch(getContacts(),{signal:controller.signal}) 
       const result=await data.json();
      //  setContact(result);
       const searchItem= contact.filter((item)=>item.fullName?.toLowerCase().includes(search));
    if(!search){
      setContact(result)
    }
    else{
      setContact(searchItem)

    }
       setIsLoading(false);
       setError(false)
      } catch (error) {
        if(error.name!=="AbortError"){
          
          setIsLoading(false)
          setError(true)
        }
         
        
       
       
        
      }
     }
    
     fetchData();
     return ()=>controller.abort();
   
  },[search])





  const changeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setContactOne({...contactOne,[name]:value});
    
  }



  


  

  const addHandlerButton=()=>{

  if(contactOne.fullName&&contactOne.email&&contactOne.tell){
    setContact((contact)=>[...contact,contactOne]);
    fetchinfo({contactOne});
    setContactOne({
      
      fullName:"",
      email:"",
      job:"",
      tell:"",
    })
    
    setValidateField({
      fullName:"",
      email:"",
      job:"",
      tell:""
    })
  }
setIsShow(false);

  }

//edit formHanler
// const editHandlerButton=()=>{
//   updateInfo({contactOne})
//  setContactOne({
      
//   fullName:"",
//   email:"",
//   job:"",
//   tell:"",
// })

// setValidateField({
//   fullName:"",
//   email:"",
//   job:"",
//   tell:""
// })

// }


  const showAddForm=()=>{
    setIsShow(true)
  }

  
  const handleInputChange=(e)=>{
    setSearch(e.target.value?.toLowerCase());
    console.log(search);
  }



  const checkHandler=(e,id)=>{
    if(e.target.checked===true){
      setCheck(true);
      setIds((ids)=>[...ids,id])
    }
    else if(e.target.checked===false){
      return
    }

    
  }



   const itemsSelectedForDeletion=()=>{
   console.log("first");
  //   const newContact=contact.filter((contactt)=>contactt.id!==ids)
  // setContact(newContact)
  setIds((ids)=>{ids.map((id)=>{
    
   
    return(
     axios.delete(`http://localhost:3000/contacts/${id}`)
  
  .then(response => {
    const newContact=contact.filter((contactt)=>contactt.id!==id)
    setContact(newContact)
    console.log('User deleted successfully:', response.data);
  })
  .catch(error => {
    if(error.message!=="Request failed with status code 404"){
      console.error('Error deleting user:', error);
    }
    
  })
 
 
)


   })})
}         
      
        
      
  




const ignoreHandler=()=>{
  setContactOne({
      
    fullName:"",
    email:"",
    job:"",
    tell:"",
  })
  
  setValidateField({
    fullName:"",
    email:"",
    job:"",
    tell:""
  })
}




const deleteHandler=(id)=>{
  
  const newContact=contact.filter((contactt)=>contactt.id!==id)
  setContact(newContact)
 axios.delete(`http://localhost:3000/contacts/${id}`,
    {method:"delete"});
     console.log("Delete is Success! :D");
   }
 

  const clickForDelete=()=>{
    setShowCheckBox(true)
  } 

  return (

   <contactContext.Provider value={{clickForDelete,contactOne,validateField,setValidateField,addHandlerButton,changeHandler,contact,setIsShow,search,handleInputChange,itemsSelectedForDeletion,ignoreHandler,deleteHandler,showCheckbox,check,setCheck,setIds,ids,checkHandler}}>



    <div className={style.function}>
   <button onClick={showAddForm} className={style.addContact}><img src={addContact}/></button>
  

    <Search/>

    <button className={style.itemsDeleteButton} onClick={clickForDelete}>حذف چند مخاطب  </button>
    {check?(<> <button className={style.selectedforDeleteButton} onClick={itemsSelectedForDeletion} >حذف</button><button className={style.selectedforDeleteButton} onClick={()=>{setCheck(false);setShowCheckBox(false)}}>برگشت</button></>):""}
    </div>
    
   <div align="center">
    
    {isLoading?(<HashLoader/>):error?<h3>خطایی رخ داد....</h3>:(
      
     <>
     {isShow?<AddForm/>:null} 

      <div>
      <ContactsList/>
      </div>
   
   </>)}
   </div>
   
   </contactContext.Provider>
   
  );
}

export default App;
