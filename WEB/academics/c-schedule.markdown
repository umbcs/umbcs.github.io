---
title: "Course Schedule"
layout: page
permalink: "/course-schedule"
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<select id="semester" onChange='javascript:update_schedule();'>
  <option value="schedule_spring_2022.xlsx">Spring 2022</option>
  <option value="schedule_summer_2022.xlsx">Summer 2022</option>
  <option value="schedule_fall_2022.xlsx">Fall 2022</option>
  <option value="schedule_spring_2023.xlsx">Spring 2023</option>
  <option value="schedule_fall_2023.xlsx">Fall 2023</option>
  <option value="schedule_summer_2024.xlsx">Summer 2024</option>
  <option value="schedule_fall_2024.xlsx" selected>Fall 2024</option>
</select>

<table id="schedule">
  <thead>
    <tr>
      <th>Course</th>
      <th>Section</th>
      <th>Title</th>
      <th>Room</th>
      <th>Days</th>
      <th>Time</th>
      <th>Instructor</th>
      <th>Remark</th>
    </tr>
  </thead>
  <tbody id="schedule_listing">
  </tbody>
</table>

<script type="text/javascript">

window.onload = function() {

  update_schedule();

}

function update_schedule() {

  var url = document.getElementById('semester').value;
  var element = document.getElementById("schedule_listing");

  printSchedule( url, element );

}

</script>
