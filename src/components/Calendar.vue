<template>
  <div id="calendar">
    <h2 class="data"></h2>
    <button class="arrow left">
      <img src="../assets/arrow left.svg" alt="arrow left" />
    </button>
    <button class="arrow right">
      <img src="../assets/arrow right.svg" alt="arrow right" />
    </button>
    <table>
      <thead>
        <tr>
          <th v-for="day in days">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
      ],
    };
  },
};
</script>

<style scoped>
table {
  background-color: rgb(101, 122, 182);
  border: 1px solid #fff;
  min-width: 700px;
  min-height: 700px;
}

td,
th {
  border: 1px solid #fff;
  padding: 3px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

th {
  font-weight: bold;
  background-color: rgb(44, 56, 90);
}
a {
  display: block;
  padding: 20px;
}
td:hover {
  background-color: rgb(44, 56, 90);
  transition: all 0.3s ease 0s;
}
</style>
