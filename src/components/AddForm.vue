<template>
  <form class="add-form">
    <input
      v-model="taskText"
      v-on:input="addTaskText"
      class="add-form-input"
      type="text"
      aria-label="Описание задачи"
      placeholder="Введите задачу"
    />

    <button @click.prevent="selectTime" class="add-form-button" type="submit">
      Выбрать время
    </button>
    <select
      v-model="time"
      v-on:input="addTime"
      v-if="isSelectVisible"
      class="add-form-select"
      name="time"
      id="time"
    >
      <option :key="time" v-for="time in times" v-bind:value="time">
        {{ time }}
      </option>
    </select>
    <button @click="addTask" class="add-form-button" type="submit">
      Добавить задачу
    </button>
  </form>
</template>

<script>
export default {
  props: {
    taskName: String,
    selectedTime: String,
    times: Array,
    addTask: Function,
  },
  data() {
    return {
      isSelectVisible: false,
      taskText: this.taskName,
      time: this.selectedTime,
    };
  },
  methods: {
    addTaskText() {
      this.$emit('newTask', this.taskText);
    },
    addTime() {
      this.$emit('time', this.time);
      console.log(this.time);
    },
    selectTime() {
      this.isSelectVisible = !this.isSelectVisible;
    },
  },
};
</script>
