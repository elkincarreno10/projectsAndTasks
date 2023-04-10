import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../graphql/projects"
import ProjectCard from "./ProjectCard"

interface ProjectProp {
    _id: string
    name: string
    description: string
}

const ProjectList = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS)

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>

  return (
    <div className="overflow-y-auto h-96 px-5 w-full">
      {data.projects && (
        data.projects.map((project: ProjectProp) => (
            <ProjectCard key={project._id} project={project} />
        ))
      )}
    </div>
  )
}

export default ProjectList
