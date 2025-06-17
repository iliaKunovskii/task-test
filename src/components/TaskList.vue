<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex"
import { key } from "@/store"
import TaskItem from "./TaskItem.vue"
import type { Task, TaskFilter } from "@/types/task"

const store = useStore(key)

const tasks = computed(() => store.getters.filteredTasks)
const activeFilter = computed(() => store.state.activeFilter)
const activeCount = computed(() => store.getters.activeCount)

const filters = [
	{ label: "Все", value: "all" },
	{ label: "Активные", value: "active" },
	{ label: "Выполненные", value: "completed" },
]

const handleAddTask = (title: string) => {
	if (title.trim()) {
		store.dispatch("addTask", title.trim())
	}
}

const handleToggle = (task: Task) => {
	store.dispatch("toggleTaskStatus", task.id)
}

const handleDelete = (id: number) => {
	store.dispatch("deleteTask", id)
}

const handleFilterChange = (filter: TaskFilter) => {
	store.dispatch("setFilter", filter)
}
</script>

<template>
	<div class="task-list">
		<div class="add-task">
			<input
				type="text"
				placeholder="Новая задача"
				@keyup.enter="handleAddTask($event.target.value)"
				class="input"
			/>
		</div>

		<div class="filters">
			<button
				v-for="filter in filters"
				:key="filter.value"
				:class="['filter-btn', { active: activeFilter === filter.value }]"
				@click="handleFilterChange(filter.value)"
			>
				{{ filter.label }}
			</button>
		</div>

		<ul class="tasks">
			<TaskItem
				v-for="task in tasks"
				:key="task.id"
				:task="task"
				@toggle="handleToggle"
				@delete="handleDelete"
			/>
		</ul>

		<div class="footer">
			<span>{{ activeCount }} активных задач</span>
		</div>
	</div>
</template>

<style scoped>
.task-list {
	max-width: 600px;
	margin: 0 auto;
	padding: 2rem;
}

.input {
	width: 100%;
	padding: 0.75rem;
	font-size: 1rem;
	margin-bottom: 1rem;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.filters {
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
}

.filter-btn {
	padding: 0.5rem 1rem;
	margin: 0 0.25rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	background: #f9f9f9;
}

.filter-btn.active {
	background: #3498db;
	color: white;
	border-color: #3498db;
}

.tasks {
	list-style: none;
	padding: 0;
	margin: 0;
}

.footer {
	margin-top: 1rem;
	text-align: center;
	color: #888;
}
</style>
