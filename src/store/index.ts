import { createStore, Store } from "vuex"
import type { Task, TaskFilter } from "@/types/task"
import { api } from "@/services/mock-api"
import type { InjectionKey } from "vue"

export interface State {
	tasks: Task[]
	activeFilter: TaskFilter
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	state: {
		tasks: [
			{ id: 1, title: "Задача 1", completed: true },
			{ id: 2, title: "Задача 2", completed: false },
			{ id: 3, title: "Задача 3", completed: false },
		],
		activeFilter: "all",
	},
	getters: {
		filteredTasks: state => {
			switch (state.activeFilter) {
				case "active":
					return state.tasks.filter(task => !task.completed)
				case "completed":
					return state.tasks.filter(task => task.completed)
				default:
					return state.tasks
			}
		},
		activeCount: state => {
			return state.tasks.filter(task => !task.completed).length
		},
	},
	actions: {
		async fetchTasks({ state, commit }) {
			const tasks = await api.getTasks(state.tasks)
			commit("SET_TASKS", tasks)
		},
		async addTask({ state, commit }, title: string) {
			const newTasks = await api.addTask(title, state.tasks)
			commit("SET_TASKS", newTasks)
		},
		async deleteTask({ state, commit }, id: number) {
			const newTasks = await api.deleteTask(id, state.tasks)
			commit("SET_TASKS", newTasks)
		},
		async toggleTaskStatus({ state, commit }, id: number) {
			const newTasks = await api.updateTaskStatus(id, true, state.tasks)
			commit("SET_TASKS", newTasks)
		},
		setFilter({ commit }, filter: TaskFilter) {
			commit("SET_FILTER", filter)
		},
	},
	mutations: {
		SET_TASKS(state, tasks: Task[]) {
			state.tasks = tasks
		},
		SET_FILTER(state, filter: TaskFilter) {
			state.activeFilter = filter
		},
	},
})
