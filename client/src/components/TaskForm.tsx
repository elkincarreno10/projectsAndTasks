import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_TASK } from "../graphql/tasks"
import { useParams } from "react-router-dom"

const TaskForm = () => {

    const [ title, setTitle ] = useState('')

    const [ createTask ] = useMutation(CREATE_TASK, {
        refetchQueries: ['getProject']
    })

    const params = useParams()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await createTask({
            variables: {
                title: title,
                projectId: params.id
            }
        })
        setTitle('')
    }

  return (
    <form
        onSubmit={handleSubmit}
    >
        <input 
            className="bg-zinc-900 text-white rounded-lg p-2 w-full mb-2" 
            type="text" 
            name='title' 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Add a Task"
        />
        <button
            className="bg-sky-900 text-white w-full p-2 rounded-lg"
        >Add</button>
    </form>
  )
}

export default TaskForm
