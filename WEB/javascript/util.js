
function loadCourses(filename) {

  var url = filename;

  var req = new XMLHttpRequest();

  req.open("GET", url, false);

  req.onload = function(e) {

    courses = JSON.parse(req.responseText);

  }

  req.send();
  
  return courses;

}



function printSchedule(url, element) {

  var req = new XMLHttpRequest();

  req.open("GET", url, true);
  req.responseType = "arraybuffer";

  req.onload = function(e) {

    NAME_MAP = {
            'Junichi Suzuki': 'Jun Suzuki',
            'Ronald Cheung': 'Ron Cheung',
            'Swaminathan Raghunathan Iyer':  'Swami Iyer',
            'Tiago Soares Cogumbreiro Garcia': 'Tiago Cogumbreiro',
            'Funda Durupinar Babur' : 'Funda Durupinar',
            'Daniel Felix Haehn': 'Daniel Haehn',
            'Kenneth Kofi Fletcher': 'Kenneth Fletcher',
            'Glenn Alfred Hoffman': 'Glenn Hoffman',
            'TBD' : 'CS Faculty',
            'BLANK' : 'CS Faculty',
            'Unassigned': 'CS Faculty',
            'Christopher Grant Kelly': 'Chris Kelly',
            'Management Instructor': 'Management Faculty'
    }



    var courses = loadCourses("courses.json");

    var wb = XLSX.read(req.response);

    json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    var all_html = '';

    for (var row in json) {

      var row = json[row];

      var course = row['Subject'].trim()+row['Ctlg #'].trim();
      var section = row['Sect'];
      var title = courses[course];
      var room = row['Fac Id'];
      var days = row['Mtg Ptrn'];
      var time = row['Mtg Start'] + '-' + row['Mtg End'];
      if (row['Mtg Start'] == null) {
        time = "";
      }

      var instructor = row['Emp Name'].split(',');
      var firstname = instructor[1];
      var lastname = instructor[0];

      if (firstname === undefined) {
        firstname = '';
      }

      instructor = firstname + " " + lastname;
      if (NAME_MAP.hasOwnProperty(instructor.trim())) {
        instructor = NAME_MAP[instructor.trim()];
      }
    


      var remark = '';

      if (section.toLowerCase().endsWith('d')) {
        remark = "Discussion";
        section = section.substr(0,section.length-1);
      } else if (section.toLowerCase().endsWith('l')) {
        remark = "Lab";
        section = section.substr(0,section.length-1);
      } else if (section.toLowerCase().endsWith('c')) {
        remark = "Capstone";
        section = section.substr(0,section.length-1);
      }  

      var url1 = "<a href='academics/courses/" + course + "'>";
      var url2 = "</a>";

      var html = "<tr>";
      html += "<td>"+url1+course+url2+"</td>";
      html += "<td>"+section+"</td>";
      html += "<td>"+title+"</td>";
      html += "<td>"+room+"</td>";
      html += "<td>"+days+"</td>";
      html += "<td>"+time+"</td>";
      html += "<td>"+instructor+"</td>";
      html += "<td>"+remark+"</td>";
      html += "</tr>";

      all_html += html;

    }

    element.innerHTML = all_html;

  }

  req.send();

}
