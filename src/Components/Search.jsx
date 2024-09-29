import { useContext } from "react"
import { contactContext } from "../App"


function Search() {
    const {search,handleInputChange}=useContext(contactContext)
  return (
    <div> 
        <input type="text" name="searchbox" id="searchBox"  placeholder="searhBox" value={search}   onChange={handleInputChange}/>
        </div>
  )
}

export default Search