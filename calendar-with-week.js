const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MS_PER_DAY = 1000 * 3600 * 24; 

class CalendarWithWeek {
  constructor(year, mode) {
    this.repo = this.makeRepo(year, mode);
    this.year = year;
    this.mode = mode;
  }

  setYear(year) {
    this.year = year;
    this.repo = this.makeRepo(year, this.mode);
  }

  setMode(mode) {
    this.mode = mode;
    this.repo = this.makeRepo(this.year, mode);
  }

  countDay(y) {
    const isLeapYear = ((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0);
    return isLeapYear ? 366 : 365;
  }

  // Repo is a POJO that contains 12 months for rendering purpose
  makeRepo(year, mode) {
    const days = this.countDay(year);
    const firstDay = new Date(year, 0, 1);
    const firstDayInMs = firstDay.getTime();
    const firstSundayIndex = this.indexOfFirstSundayOfYear(year, mode);

    var repo = [[], [], [], [], [], [], [], [], [], [], [], []]; // 12 months
    var weekNum = 0;
    if (mode === 'Inclusive' && firstSundayIndex) {
      weekNum = 1;
    }

    for (let i = 0; i < days; i++) {
      if ((i - firstSundayIndex) % 7 === 0) {
        weekNum++;
      }

      const date = new Date(firstDayInMs + i * MS_PER_DAY);
      const month = date.getMonth();
      repo[month].push({
        dateOfMonth: date.getDate(),
        dayOfWeek: date.getDay(),
        weekNum,
        raw: date
      });
    }

    return repo;
  }

  isToday(date) {
    return date.toDateString() === new Date().toDateString();
  }

  indexOfFirstSundayOfYear(year) {
    const firstDayInMs = new Date(year, 0, 1).getTime();
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayInMs + i * MS_PER_DAY);
      if (date.getDay() === 0) {
        return i;
      }
    }
  }

  renderCalendar(dom) {
    dom.innerHTML = '';
    const months = this.repo;
    for (let i = 0; i < months.length; i++) {
      dom.appendChild(this.renderSingleMonth(months[i], MONTHS[i]));
    }
  }

  renderSingleMonth(month, name) {
    const monthContainer = createDivNode(null, 'month-container');
    const weekNum = createDivNode(null, 'week-nums');
    const calendarCells = createDivNode(null, 'cells');
    // Most weeks don't start at Sunday, weekOffset is the gaps
    const weekOffset = month[0].dayOfWeek;

    monthContainer.appendChild(createDivNode(name, 'month-name'));
    monthContainer.appendChild(weekNum);
    monthContainer.appendChild(calendarCells);

    // For simplicity, to insert weekNum just calculate how many week does that
    //   month span, pick the first weekNum and increase it
    const weekSpan = Math.ceil((month.length + weekOffset) / 7)
    weekNum.appendChild(createDivNode('WN'));
    for (let i = 0; i < weekSpan; i++) {
      weekNum.appendChild(createDivNode(month[0].weekNum + i))
    }

    // Create days of week name: Sunday, Monday, Tuesday...
    for (let i = 0; i < DAYS.length; i++) {
      calendarCells.appendChild(createDivNode(DAYS[i], 'days-name'));
    }

    // Add a div per weekOffset before actual dates
    for (let i = 0; i < weekOffset; i++) {
      calendarCells.appendChild(createDivNode());
    }

    // Fill all dates within the month
    for (let i = 0; i < month.length; i++) {
      const className = this.isToday(month[i].raw) ? 'today' : null;
      calendarCells.appendChild(createDivNode(month[i].dateOfMonth, className));
    }

    return monthContainer;
  }
}

function createDivNode(content, className) {
  const div = document.createElement('div');

  if (content) {
    div.appendChild(document.createTextNode(content));
  }

  if (className) {
    div.className = className
  }

  return div;
}

const currentYear = new Date().getFullYear();
var c = new CalendarWithWeek(currentYear, 'Exclusive');
var renderTo = document.getElementById('calendar');
var renderFrom = document.getElementById('year');

renderFrom.innerText = currentYear;
c.renderCalendar(renderTo);

function goBack(e) {
  c.setYear(--renderFrom.innerText);
  c.renderCalendar(renderTo);
}

function goNext(e) {
  c.setYear(++renderFrom.innerText);
  c.renderCalendar(renderTo);
}

function changeMode(mode) {
  c.setMode(mode);
  c.renderCalendar(renderTo);
}