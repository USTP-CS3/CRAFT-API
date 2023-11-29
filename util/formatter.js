const formatData = (studentData) => {
 if (studentData.studentData.department === 'B.S. in Computer Science') {
  studentData.studentData.department = 'CS';
 } else if (
  studentData.studentData.department === 'B.S. in Information Technology'
 ) {
  studentData.studentData.department = 'IT';
 } else if (studentData.studentData.department === 'B.S. in Data Science') {
  studentData.studentData.department = 'DS';
 } else studentData.studentData.department = 'TCM';

 if (
  studentData.studentData.college ===
  'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING'
 ) {
  studentData.studentData.college = 'CITC';
 }

 if (studentData.studentData.middle_initial.length > 1) {
  studentData.studentData.middle_initial = null;
 }

 if (studentData.studentData.first_name.split(' ').pop().length === 1) {
  const first_name = studentData.studentData.first_name.split(' ').slice(0, -1);

  studentData.studentData.first_name = first_name.join(' ');
 }

 return studentData;
};

export default formatData;
