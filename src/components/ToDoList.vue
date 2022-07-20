<template>
  <div id="toDoList" style="display: contents">
    <section class="task">
      <h2>Задачи</h2>
      <template v-if="notDoneTaskList.length">
        <ul
          class="todo-list"
          v-for="(task, time, index) in notDoneTaskList"
          :key="index"
        >
          <li class="todo-list-item">
            <div>
              <img
                v-if="task.isImportant"
                class="todo-list-img important-icon"
                src="../assets/flames.png"
                alt="important"
              />
              <span
                v-if="!task.editable"
                @click="editTask(task)"
                class="todo-list-time"
                >{{ task.time }}</span
              >
              <select
                v-model="task.time"
                v-else
                class="todo-list-select"
                name="time"
                id="time"
              >
                <option :key="time" v-for="time in times" v-bind:value="time">
                  {{ time }}
                </option>
              </select>

              <input
                v-model="task.isDone"
                class="todo-list-input"
                type="checkbox"
              />

              <span
                v-if="!task.editable"
                @click="editTask(task)"
                class="todo-list-task"
                :class="{ empty: !task.name }"
                >{{ task.name ? task.name : 'Введите задачу' }}</span
              >
              <input
                v-else
                class="todo-list-edit"
                type="text"
                v-model="task.name"
                v-on:keyup.enter="task.editable = !task.editable"
              />

              <button class="todo-list-button">
                <img
                  v-if="task.editable"
                  @click="editTask(task)"
                  class="todo-list-img"
                  src="../assets/save.png"
                  alt="save"
                />
                <img
                  v-else-if="!task.editable"
                  @click="editTask(task)"
                  class="todo-list-img"
                  src="../assets/edit.png"
                  alt="edit"
                />
              </button>
              <button @click="importantTask(task)" class="todo-list-button">
                <img
                  class="todo-list-img"
                  src="../assets/important.png"
                  alt="important"
                />
              </button>

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
      </template>
      <p v-else class="empty-tasks">Все задачи выполнены. Новых задач нет</p>
      <AddForm
        :taskName="taskName"
        v-on:newTask="addTaskName"
        :selectedTime="selectedTime"
        v-on:time="addTime"
        :times="times"
        :addTask="addTask"
      ></AddForm>
    </section>
    <Ready :doneTaskList="doneTaskList" :deleteTask="deleteTask"></Ready>
  </div>
</template>

<script>
import Ready from './Ready.vue';
import AddForm from './AddForm.vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
const times = [];
for (let i = 0; i <= 23; i++) {
  if (i < 10) {
    times.push('0' + i + ':00');
  } else {
    times.push(i + ':00');
  }
}
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      taskName: '',
      taskList: [],
      times,
      selectedTime: '00:00',
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
    '$route.query.date': {
      handler(date) {
        if (date) return;
        this.$router.replace({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            date: new Date().toLocaleDateString(),
          },
        });
      },
      immediate: true,
    },
  },
  computed: {
    doneTaskList() {
      return this.todayTaskList.filter((task) => task.isDone);
    },
    notDoneTaskList() {
      return this.todayTaskList.filter((task) => !task.isDone);
    },

    todayTaskList() {
      return this.taskList.filter(
        (task) => task.date === this.$route.query.date
      );
    },
    sortedList() {
      return this.taskList.sort(function (a, b) {
        if (a.time > b.time) {
          return 1;
        }
        if (a.time < b.time) {
          return -1;
        }
        return 0;
      });
    },
  },
  validations() {
    return {
      taskName: { required },
    };
  },
  methods: {
    addTaskName(value) {
      this.taskName = value;
    },
    addTask() {
      this.taskList.push({
        name: this.taskName,
        isDone: false,
        time: this.selectedTime,
        date: this.$route.query.date,
        isImportant: false,
        editable: false,
      });
      this.taskName = '';
      this.isSelectVisible = false;
      this.selectedTime = '0:00';
    },
    deleteTask(task) {
      let index = this.taskList.indexOf(task);
      if (index === -1) return;
      this.taskList.splice(index, 1);
    },
    addTime(value) {
      this.selectedTime = value;
    },

    importantTask(task) {
      task.isImportant = !task.isImportant;
    },
    editTask(task) {
      task.editable = !task.editable;
    },
  },
  components: { Ready, AddForm },
};
</script>

<style>
.task {
  border-right: 2px solid var(--main-color-black);
  height: 100vh;
  align-self: flex-start;
  padding: 40px 0;
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
.empty {
  color: #a1b5c4;
}
h2:not(:last-child) {
  margin-bottom: 40px;
}

.todo-list-input {
  width: 16px;
  height: 16px;
  margin-right: 16px;
  background-color: #ffffff;
  border: 2px solid var(--main-color-black);
  border-radius: 4px;
  align-self: center;
}

.todo-list {
  list-style: none;
  margin: 0 16px 0 16px;
}

.todo-list-item {
  margin-bottom: 12px;
  position: relative;
}

.todo-list-item div {
  display: flex;
  padding: 12px 18px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  user-select: none;
}

.todo-list-task {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  width: 70%;
  margin-right: 10px;
  padding-left: 5px;
}
.todo-list-edit {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  width: 70%;
  border: 1px solid var(--main-color-black);
  border-radius: 4px;
  margin-right: 10px;
  padding-left: 5px;
}
.todo-list-time {
  margin-right: 15px;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  padding: 8px;
}
.todo-list-select {
  flex-shrink: 0;
  padding: 5px;
  border: 1px solid var(--main-color-black);
  border-radius: 4px;
  margin: 0 16px 0 0px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
}

.todo-list-button:not(:last-child) {
  margin-right: 5px;
}
.todo-list-button:hover {
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%), 0px 4px 4px rgb(0 0 0 / 54%);
}
.todo-list-img {
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.important-icon {
  width: 23px;
  height: 23px;
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
  flex-direction: column;
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
.add-form-input:not(:last-child) {
  margin-bottom: 15px;
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
.add-form-button:not(:last-child) {
  margin-bottom: 15px;
}
.add-form-button:hover,
.add-form-button:focus {
  outline: none;
  background-color: rgb(44, 56, 90);
}

.add-form-button:active {
  background-color: #42862e;
}
.add-form-select {
  flex-shrink: 0;
  padding: 12px;
  border: 1px solid var(--main-color-black);
  border-radius: 4px;
  margin: 0 16px 0 16px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
}
.add-form-select:not(:last-child) {
  margin-bottom: 15px;
}

@media (max-width: 1250px) {
  .task,
  .ready {
    padding-top: 0;
    flex: 0 1 100%;
    width: 100%;
    align-self: center;
    border: none;
  }
  .ready {
    padding: 40px 0 50px 0;
  }

  .add-form-input {
    flex: 0 1 100%;
  }

  .add-form-button {
    flex: 0 1 100%;
  }
}
@media (max-width: 510px) {
  .header-link {
    font-size: 46px;
  }
  h2 {
    font-size: 36px;
  }
}
@media (max-width: 450px) {
  .empty-tasks {
    text-align: center;
  }
}
</style>
