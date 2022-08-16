import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import AddClientForm from './AddClientForm'

const AddClient = () => {
    const [add, setAdd] = useState(false)
   
  return (
    <>
        <div className="d-block">
            <button onClick={() => setAdd(!add)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Add Client</div>
                </div>
            </button>

            {
                add && ( 
                    <AddClientForm setAdd={setAdd} />
                )
            }
        
        </div>
    </>
  )
}

export default AddClient