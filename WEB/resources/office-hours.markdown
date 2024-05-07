---
title: "Office Hours"
layout: page
permalink: "office-hours"
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<select id="semester" onChange='javascript:update_office_hours();'>
  <option value="office_hours_schedule_spring_2024.xlsx" selected>Spring 2024</option>
</select>

<table id="office_schedule">
  <thead>
    <tr>
      <th>Instructor</th>
      <th>Email</th>
      <th>Office Location</th>
      <th>Office Phone Number</th>
      <th>Office Hours</th>
    </tr>
  </thead>
  <tbody id="office_schedule_listing">
  </tbody>
</table>

<script type="text/javascript">

window.onload = function() {

  update_office_hours();

}

function update_office_hours() {

  var url = document.getElementById('semester').value;
  var element = document.getElementById("office_schedule_listing");

  printOfficeHours( url, element );

}

</script>
