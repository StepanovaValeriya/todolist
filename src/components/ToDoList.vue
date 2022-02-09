<template>
  <div id="toDoList" style="display: contents">
    <section class="task">
      <h2>Задачи</h2>
      <template v-if="notDoneTaskList.length">
        <ul
          class="todo-list"
          v-for="(task, index) in notDoneTaskList"
          :key="index"
        >
          <li class="todo-list-item">
            <label>
              <input
                v-model="task.isDone"
                class="todo-list-input"
                type="checkbox"
              />
              <span>{{ task.name }}</span>
              <button @click="deleteTask(task)" class="todo-list-button">
                <img
                  class="todo-list-img"
                  src="../assets/delete.svg"
                  alt="delete"
                />
              </button>
            </label>
          </li>
        </ul>
      </template>
      <p v-else class="empty-tasks">Все задачи выполнены. Новых задач нет</p>
      <form @submit.prevent="addTask" class="add-form">
        <input
          v-model="taskName"
          class="add-form-input"
          type="text"
          aria-label="Описание задачи"
          required
        />
        <button class="add-form-button" type="submit">Добавить задачу</button>
      </form>
    </section>
    <section class="ready">
      <h2>Выполненно</h2>
      <ul class="todo-list" v-for="(task, index) in doneTaskList" :key="index">
        <li class="todo-list-item">
          <label>
            <input
              v-model="task.isDone"
              class="todo-list-input"
              type="checkbox"
            />
            <span>{{ task.name }}</span>
            <button @click="deleteTask(task)" class="todo-list-button">
              <img
                class="todo-list-img"
                src="../assets/delete.svg"
                alt="delete"
              />
            </button>
          </label>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
      taskList: [],
    };
  },

  created() {
    let taskList = localStorage.taskList;
    if (!taskList) return;
    this.taskList = JSON.parse(taskList);
  },
  watch: {
    taskList: {
      handler(taskList) {
        localStorage.taskList = JSON.stringify(taskList);
      },
      deep: true,
    },
  },
  computed: {
    doneTaskList() {
      return this.taskList.filter((task) => task.isDone);
    },
    notDoneTaskList() {
      return this.taskList.filter((task) => !task.isDone);
    },
  },
  methods: {
    addTask() {
      this.taskList.push({
        name: this.taskName,
        isDone: false,
      });
      this.taskName = '';
    },
    deleteTask(task) {
      let index = this.taskList.indexOf(task);
      if (index === -1) return;
      this.taskList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.task {
  border-right: 2px solid var(--main-color-black);
  height: 100vh;
  align-self: flex-start;
  padding: 40px 50px;
  flex: 0 1 40%;
}
.ready {
  align-self: flex-start;
  padding: 40px 0 50px 50px;
  border-left: 2px solid var(--main-color-black);
  height: 100vh;
  flex: 0 1 40%;
}

h2 {
  font-weight: 800;
  font-size: 54px;
  line-height: calc(80 / 58 * 100%);
  letter-spacing: 0.2px;
  text-align: center;
  padding-left: 5px;
}
h2:not(:last-child) {
  margin-bottom: 40px;
}
.visually-hidden,
.todo-list-input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
}

.todo-list {
  list-style: none;
  margin: 0 16px 0 16px;
}

.todo-list-item {
  margin-bottom: 12px;
}

.todo-list-item label {
  display: flex;
  padding: 12px 18px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  user-select: none;
}

.todo-list-item span {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
}

.todo-list-input + span::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  background-color: #ffffff;
  border: 2px solid var(--main-color-black);
  border-radius: 4px;
}

.todo-list-input:checked + span::before {
  background-color: #69b253;
  background-image: url('check-white.svg');
  background-repeat: no-repeat;
  background-position: center;
}

.todo-list-input:not(:checked):hover + span::before,
.todo-list-input:not(:checked):focus + span::before {
  background-color: rgba(105, 178, 83, 0.2);
}
.todo-list-button {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.todo-list-button:hover {
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%), 0px 4px 4px rgb(0 0 0 / 54%);
}
.todo-list-img {
  width: 100%;
  height: 100%;
}
.empty-tasks {
  color: #69b253;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.empty-tasks::before {
  content: '';
  width: 14px;
  height: 13px;
  margin-right: 13px;
  background-image: url('check-green.svg');
  background-repeat: no-repeat;
  background-position: center;
}

.add-form {
  display: flex;
  flex-wrap: wrap;
}

.add-form-input {
  flex-grow: 1;
  box-sizing: border-box;
  height: 46px;
  margin: 0 16px 0 16px;
  padding: 12px;
  font: inherit;
  border: 1px solid #a1b5c4;
  border-radius: 4px;
}

.add-form-input:focus {
  border: 1px solid var(--main-color-black);
  outline: none;
}

.add-form-input:hover {
  box-shadow: 0 0 6px rgba(105, 178, 83, 0.6);
}

.add-form-input::placeholder {
  color: #a1b5c4;
}

.add-form-button {
  flex-shrink: 0;
  padding: 12px;
  font: inherit;
  color: #ffffff;
  background-color: var(--main-color-black);
  border: none;
  border-radius: 4px;
  user-select: none;
  touch-action: manipulation;
  margin: 0 16px 0 16px;
}

.add-form-button:hover,
.add-form-button:focus {
  outline: none;
  background-color: rgb(44, 56, 90);
}

.add-form-button:active {
  background-color: #42862e;
}
@media (max-width: 1250px) {
  .task,
  .ready {
    align-self: flex-start;
    flex: 0 1 35%;
    padding: 40px 0px;
    width: 100%;
  }
  .add-form-input {
    flex: 0 1 100%;
  }
  .add-form-input:not(:last-child) {
    margin-bottom: 15px;
  }
  .add-form-button {
    flex: 0 1 100%;
  }
}

@media (max-width: 1060px) {
  .container {
    flex-direction: column;
  }
  .sidebar {
    min-height: 100%;
  }
  .menu {
    width: 100%;
  }
  .menu-list {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  .menu-title {
    display: none;
  }
  .task,
  .ready {
    padding-top: 0;
    flex: 0 1 100%;
    width: 100%;
    align-self: center;
    border: none;
  }
}
@media (max-width: 420px) {
  .header-link {
    font-size: 56px;
  }
  h2 {
    font-size: 36px;
  }
}
</style>
