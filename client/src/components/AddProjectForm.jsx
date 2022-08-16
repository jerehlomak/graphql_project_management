import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientsQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'

const AddProjectForm = ({ setAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        clientId: '',
        status: 'new',
    })
    const { name, description, clientId, status } = formData

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS })
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects.concat([addProject]) }
            })
        }
    })


    //Get Clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    } 
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        if (name === '' || description === '' || status === '') {
            return alert('Please fill in all fields')
        }

       // addProject to cache
       addProject(name, description, status, clientId)
        setFormData({
            name: '',
            description: '',
            status: ''
        })
        setAdd(false)
    }

    if (loading) return null
    if (error) return 'Something went Wrong'
  return (
    <>
        {!loading && !error && (
            <>
                <div className='mt-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor='name' className="form-label">Name</label>
                            <input 
                                type="text"
                                className='form-control' 
                                id='name'
                                value={name}
                                name="name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='description' className="form-label">Description</label>
                            <textarea
                                className='form-control' 
                                id='description'
                                value={description}
                                name="description"
                                onChange={handleChange}
                                required
                            >
                            </textarea>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="status" className="form-label">Status</label>
                            <select 
                                name="status" 
                                id="status"
                                value={status}
                                className='form-select'
                                onChange={handleChange}>
                                    <option value='new'>Not Started</option>
                                    <option value='progress'>In Progress</option>
                                    <option value='completed'>Completed</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Client</label>
                            <select  
                                className='form-select'
                                name="clientId" 
                                id="clientId"
                                value={clientId}
                                onChange={handleChange}
                            >
                                <option value="">Select Client</option>
                                {data.clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className='btn btn-primary'
                            type='submit'
                            
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </>
        )}
    </>
    
  )
}

export default AddProjectForm