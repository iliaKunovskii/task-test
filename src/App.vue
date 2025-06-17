<script setup lang="ts">
import TaskList from "./components/TaskList.vue"
</script>

<template>
	<div id="app">
		<h1>Список задач</h1>
		<TaskList />
	</div>
</template>

<style>
body {
	font-family: Arial, sans-serif;
	margin: 0;
	padding: 0;
	background: #f5f5f5;
}

#app {
	padding: 2rem;
}
</style>
