import { Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../graphql/projects"
import Tasklist from "../components/Tasklist"
import TaskForm from "../components/TaskForm"


const ProjectDetails = () => {

  const params = useParams()
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id
    },
    skip: !params.id
  })

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>

  return (
    <div>

      <Link to='/projects' >
        <button className="bg-sky-900 text-white px-3 py-2">Back</button>
      </Link>

      <div className="bg-zinc-900 mb-2 p-10 flex justify-between">
        <div>
          <h1 className="text-2xl">{data.project.name}</h1>
          <p>{data.project.description}</p>
        </div>
      </div>
      <button
        className="bg-red-500 px-3 py-2"
      >
        Delete
      </button>
      <TaskForm />
      <Tasklist tasks={data.project.tasks} />
    </div>
  )
}

export default ProjectDetails
