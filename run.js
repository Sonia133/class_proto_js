var {Student,Teacher,Dean,ProDean,Administrator,DepartmentHead} = require('./class_v1_class.js');

idS = 1;
idT = 2;

idDean = 1;
idProDean = 1;

idA = 1;

Student.get(idS).then(data => {
  Teacher.get(idT).then(data => {
    let teacher = new Teacher((data[0].id), (data[0].birthDate), (data[0].name),
                       (data[0].salary), false, (data[0].subject));
    teacher.evaluateStudent(student);
    console.log("New grade for student " + student.name + ": " + student.grade);
    console.log("Status: ", student.pass() == 1 ? "Passed!" : "Failed!");
  })
  let student = new Student((data[0].id), (data[0].birthDate),(data[0].name));
});

ProDean.get(idProDean).then(data => {
  Dean.get(idDean).then(data => {
    let dean = new Dean((data[0].id), (data[0].birthDate), (data[0].name),
                       (data[0].salary), false, (data[0].nrActiveProjects), (data[0].schoolName));
    console.log(proDean.nrActiveProjects);
    dean.assignProject(proDean);
    console.log(proDean.nrActiveProjects);
  })
  let proDean = new ProDean((data[0].id), (data[0].birthDate), (data[0].name),
                     (data[0].salary), false, (data[0].nrActiveProjects));
});

Teacher.get(idT).then(data => {
  Administrator.get(idA).then(data => {
    let admin = new Administrator((data[0].id), (data[0].birthDate), (data[0].name),
                       (data[0].salary), false, (data[0].nrSchools));
    admin.fireEmployee(teacher, false);
    console.log(teacher.name + ": ", teacher.fire == false ? "Fired" : "Active");
  })
  let teacher = new Teacher((data[0].id), (data[0].birthDate), (data[0].name),
                     (data[0].salary), false, (data[0].subject));
})
