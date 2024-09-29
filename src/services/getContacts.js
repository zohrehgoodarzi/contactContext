const BASE_URL="http://localhost:3000";

const getContacts=()=>{
return `${BASE_URL}/contacts`;
}



const updateContacts=(id)=>{
    return `${BASE_URL}/contacts/${id}`
}
export {getContacts,updateContacts};
