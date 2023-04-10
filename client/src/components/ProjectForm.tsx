import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { GET_PROJECTS, CREATE_PROJECT } from "../graphql/projects"

const ProjectForm = () => {

    const [ project, setProject ] = useState({
        name: '',
        description: ''
    })
    const [ createProject, { loading, error } ] = useMutation(CREATE_PROJECT, {
        refetchQueries: [
            {
                query: GET_PROJECTS
            },
            "GetProjects"
        ]
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createProject({
            variables: {
                name: project.name,
                description: project.description
            }
        })
    }

  return (
    <form 
        onSubmit={handleSubmit} 
        className="w-2/5"
    >

        {error && <p>{error.message}</p>}

        <input 
            className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3" 
            type="text" 
            name="name" 
            placeholder="Write a title" 
            onChange={e => handleChange(e)} 
        />
        <textarea 
            className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"  
            name="description" 
            rows={3} 
            placeholder="Write a description" 
            onChange={e => handleChange(e)} 
        ></textarea>
        <button
            disabled={!project.name || !project.description || loading}
            className="bg-blue-500 px-4 py-1 rounded-md text-lg mb-3 disabled:bg-zinc-400"
        >
            Save
        </button>
    </form>
  )
}

export default ProjectForm
