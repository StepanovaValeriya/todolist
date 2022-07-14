<template>
  <section class="ready">
    <h2>Выполнено</h2>
    <ul class="todo-list" v-for="(task, index) in doneTaskList" :key="index">
      <li class="todo-list-item">
        <div>
          <span class="todo-list-time">{{ task.time }}</span>
          <input
            v-model="task.isDone"
            class="todo-list-input"
            type="checkbox"
          />
          <span class="todo-list-task">{{ task.name }}</span>

          <button @click="deleteTask(task)" class="todo-list-button">
            <img
              class="todo-list-img"
              src="../assets/delete.svg"
              alt="delete"
            />
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    doneTaskList: Array,
    deleteTask: Function,
  },
  data() {
    return {};
  },
};
</script>
