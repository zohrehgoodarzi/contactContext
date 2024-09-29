import axios from "axios";
import {updateContacts } from "../services/getContacts";

const updateInfo = async (contactOne,id) => {
console.log(contactOne);

    try {
      let res = await axios.patch(`http://localhost:3000/contacts/${id}`
       ,
        {     
            fullName: contactOne.fullName,
            email: contactOne.email,
           job: contactOne.job,
           tell:contactOne.tell
          },
        {
          method: "patch",
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
               }
        }
    
      );

      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  export default updateInfo;