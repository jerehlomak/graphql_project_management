import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const EditProjectForm = ({ project }) => {
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: "new",
  });
  const { name, description, status } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  })

  const onSubmit = (e) => {
    e.preventDefault()
    updateProject(name, description, status)
    setEdit(false)
  }
  return (
    <div className="mt-5">
      <button className="btn btn-secondary" onClick={() => setEdit(true)}>
        Edit
      </button>
      {edit && (
        <>
            <h3 className="mt-4">Update Project Details</h3>
            <form onSubmit={onSubmit}>
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
                <button className='btn btn-primary' type='submit'                 
                >
                    Update Project
                </button>
            </form>
        </>
      )}
    </div>
  );
};

export default EditProjectForm;
