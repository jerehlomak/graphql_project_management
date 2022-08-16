import React, { useState } from 'react'
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientsQueries'

const AddClientForm = ({ setAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    })
    const { name, email, phone } = formData

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    } 

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            })
        }
    })
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        if (name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields')
        }

        addClient(name, email, phone)
        setFormData({
            name: '',
            email: '',
            phone: ''
        })
        setAdd(false)
    }
  return (
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
                <label htmlFor='email' className="form-label">Email</label>
                <input 
                    type="text"
                    className='form-control' 
                    id='email'
                    value={email}
                    name="email"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor='phone' className="form-label">Phone</label>
                <input 
                    type="text"
                    className='form-control' 
                    id='phone'
                    value={phone}
                    name="phone"
                    onChange={handleChange}
                    required
                />
            </div>
            <button className='btn btn-secondary'
                type='submit'
                
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default AddClientForm