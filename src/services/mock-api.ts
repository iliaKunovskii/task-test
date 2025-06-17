import type { Task } from "@/types/task"

const DELAY = 500

export const api = {
	async getTasks(currentTasks: Task[]): Promise<Task[]> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve([...currentTasks])
			}, DELAY)
		})
	},

	async addTask(title: string, currentTasks: Task[]): Promise<Task[]> {
		return new Promise(resolve => {
			setTimeout(() => {
				const newTask: Task = {
					id: Date.now(),
					title,
					completed: false,
				}
				resolve([...currentTasks, newTask])
			}, DELAY)
		})
	},

	async deleteTask(id: number, currentTasks: Task[]): Promise<Task[]> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(currentTasks.filter(task => task.id !== id))
			}, DELAY)
		})
	},

	async updateTaskStatus(
		id: number,
		completed: boolean,
		currentTasks: Task[]
	): Promise<Task[]> {
		return new Promise(resolve => {
			setTimeout(() => {
				const updatedTasks = currentTasks.map(task =>
					task.id === id ? { ...task, completed } : task
				)
				resolve(updatedTasks)
			}, DELAY)
		})
	},
}
