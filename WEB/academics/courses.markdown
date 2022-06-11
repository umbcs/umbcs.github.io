---
title: "Courses"
layout: page
permalink: "/courses"
redirect_from:
  - /academics/courses/
---

Our department offers the following courses.

<div id='courses'></div>

<script type="text/javascript">

window.onload = function() {
  
  courses = loadCourses("courses.json");
  output = "";

  for (c in courses) {

    var number = c;
    var title = courses[c];

    var url1 = "<a href='academics/courses/" + number + "'>";
    var url2 = "</a>";
    output += url1 + number + ': ' + title + url2 + "<br>\n";

  }


  document.getElementById('courses').innerHTML = output;

}

</script>

