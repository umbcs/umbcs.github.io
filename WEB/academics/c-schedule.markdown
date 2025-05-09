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
  <option value="schedule_spring_2024.xlsx">Spring 2024</option>
  <option value="schedule_summer_session1_2024.xlsx">Summer 2024 Session 1</option>
  <option value="schedule_summer_session2_2024.xlsx">Summer 2024 Session 2</option>
  <option value="schedule_fall_2024.xlsx">Fall 2024</option>
  <option value="schedule_spring_2025.xlsx">Spring 2025</option>
  <option value="schedule_summer_session1_2025.xlsx">Summer 2025 Session 1</option>
  <option value="schedule_summer_session2_2025.xlsx">Summer 2025 Session 2</option>
  <option value="schedule_summer_session3_2025.xlsx">Summer 2025 Session 3</option>
  <option value="schedule_fall_2025.xlsx" selected>Fall 2025</option>
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
