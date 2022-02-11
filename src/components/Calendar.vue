<template>
  <div id="calendar">
    <div class="calendar-header">
      <button @click="monthAgo" class="calendar-arrow arrow-left">
        <img src="../assets/arrow left.svg" alt="arrow left" />
      </button>
      <h2 class="data">{{ monthList[month] }} {{ year }}</h2>
      <button @click="monthAHead" class="calendar-arrow arrow-right">
        <img src="../assets/arrow right.svg" alt="arrow right" />
      </button>
    </div>
    <div class="table">
      <div class="day" :key="day" v-for="day in days">{{ day }}</div>
      <div
        :class="{ other_month: isOtherMonth }"
        class="date"
        :key="date"
        v-for="date in dates"
      >
        {{ date.getDate() }}
      </div>
    </div>
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
      date: new Date(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      monthList: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      isOtherMonth: '',
    };
  },
  computed: {
    dates() {
      let firstDay = new Date(this.year, this.month, 1);
      let day = firstDay.getDay() - 1;
      if (day == -1) {
        day = 6;
      }
      let start = 1 - day;
      let dates = [];
      for (let i = 0; i < 42; i++) {
        dates.push(new Date(this.year, this.month, start + i));
      }
      return dates;
    },
    otherMonthColor() {
      if (new Date().getMonth() == this.month) {
        this.isOtherMonth = true;
        console.log(isOtherMonth);
      }
    },
  },

  methods: {
    monthAgo() {
      this.month--;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
    },
    monthAHead() {
      this.month++;
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
    },
  },
};
</script>

<style scoped>
#calendar {
  margin: 0 auto;
  padding: 50px 10px;
}
.calendar-header {
  display: flex;
  justify-content: space-around;
}
.calendar-header:not(:last-child) {
  margin-bottom: 20px;
}
h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--main-color-black);
}
.calendar-arrow {
  cursor: pointer;
  background: none;
  padding: 10px;
}
.table {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: rgb(101, 122, 182);
  border: 1px solid #fff;
  min-width: 700px;
  min-height: 700px;
}

.day,
.date {
  border: 1px solid #fff;
  padding: 3px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day {
  font-weight: bold;
  background-color: rgb(44, 56, 90);
}
.date:hover {
  background-color: rgb(44, 56, 90);
  transition: all 0.3s ease 0s;
}
</style>
