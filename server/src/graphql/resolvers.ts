import Project from "../models/Project"
import Task from "../models/Task"

interface ProjectArgs {
    _id?: string
    name: string
    description: string
}

interface TaskArgs {
    _id?: string
    title: string
    projectId: string
}

export const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        projects: async () => {
            const projects = await Project.find()
            return projects
        },
        project: async (root: any, { _id }: { _id: string }) => {
            const project = await Project.findById(_id)
            return project
        },
        tasks: async () => {
            const tasks = await Task.find()
            return tasks
        },
        task: async (root: any, { _id }: { _id: string }) => {
            const task = await Task.findById(_id)
            return task
        }
    },
    Mutation: {
        createProject: async (root: any, {name, description}: ProjectArgs) => {
            const project = new Project({
                name,
                description
            })
            const savedProject = await project.save()
            return savedProject
        },
        createTask: async (root: any, {title, projectId}: TaskArgs) => {

            const projectFound = await Project.findById(projectId)

            if(!projectFound) throw new Error('Project not found')

            const task = new Task({
                title,
                projectId
            })
            const savedTask = await task.save()
            return savedTask
        },
        deleteProject: async (root: any, { _id }: { _id: string }) => {
            const deletedProject = await Project.findByIdAndDelete(_id)
            if(!deletedProject) throw new Error('Project not found')

            await Task.deleteMany({projectId: deletedProject._id})


            return deletedProject
        },
        deleteTask: async (root: any, { _id }: { _id: string }) => {
            const deletedTask = await Task.findByIdAndDelete(_id)
            if(!deletedTask) throw new Error('Task not found')
            return deletedTask
        },
        updateProject: async (root: any, args: ProjectArgs) => {
            const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
                new: true
            })
            if(!updatedProject) throw new Error('Task not found')
            return updatedProject
        },
        updateTask: async (root: any, args: TaskArgs) => {
            const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
                new: true
            })
            if(!updatedTask) throw new Error('Task not found')
            return updatedTask
        }
    },
    Project: {
        tasks: async (root: any) => {
            return await Task.find({projectId: root._id})
        }   
    },
    Task: {
        project: async (root: any) => {
            return await Project.findById(root.projectId)
        }
    }
}