import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import AddProjectForm from "./AddProjectForm"

const AddProject = () => {
    const [add, setAdd] = useState(false)
   
  return (
    <>
        <div className="d-block">
            <button onClick={() => setAdd(!add)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>New Project</div> 
                </div>
            </button>

            {
                add && ( 
                    <AddProjectForm setAdd={setAdd} />
                )
            }
        </div>
        
        
    </>
  )
}

export default AddProject