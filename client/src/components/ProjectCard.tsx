import { useNavigate } from "react-router-dom"

interface ProjectProp {
    project : {
        _id: string
        name: string
        description: string
    }
}


const ProjectCard = ({project}: ProjectProp) => {

    const navigate = useNavigate()

  return (
    <div
        onClick={() => navigate(`/projects/${project._id}`)}
        className="bg-zync-800 w-full rounded-lg shadow-lg shadow-black p-4 mb-2  hover:bg-zinc-700 cursor-pointer"
    >
      <h2 className="text-4xl">{project.name}</h2>
      <p>{project.description}</p>
    </div>
  )
}

export default ProjectCard
