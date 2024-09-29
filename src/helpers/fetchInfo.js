import axios from "axios";
import { getContacts } from "../services/getContacts";

const fetchinfo = async ({contactOne}) => {
    try {
      let res = await axios.post(getContacts()
        ,
        {
          fullName: contactOne.fullName,
          email: contactOne.email,
         job: contactOne.job,
         tell:contactOne.tell
        },
        {
         
			headers:{
				"Content-Type":"application/json, charset:UTF-8"
			}
		
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  export default fetchinfo;