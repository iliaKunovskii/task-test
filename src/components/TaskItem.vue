<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Task } from '@/types/task';

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: 'toggle', task: Task): void;
  (e: 'delete', id: number): void;
}>();

const handleToggle = () => {
  emit('toggle', props.task);
};

const handleDelete = () => {
  emit('delete', props.task.id);
};
</script>

<template>
  <li class="task-item">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="handleToggle"
      class="checkbox"
    />
    <span :class="{ completed: task.completed }">{{ task.title }}</span>
    <button @click="handleDelete" class="delete-btn">Удалить</button>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

.checkbox {
  margin-right: 1rem;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
}
</style>
