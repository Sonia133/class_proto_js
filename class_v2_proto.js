'use strict';

var {projUpd, empUpd, studUpd, studReq,teachReq,proReq,adminReq,deanReq,depReq} = require('./fetches.js');

var Person = function(id, birthDate, name) {
  this.id = id;
  this.birthDate = birthDate;
  this.name = name;

  this.getAge = function() {
    const date = new Date();
		return Math.floor(Math.abs(date - Date.parse(this.birthDate)) / (1000*60*60*24*365));
  }

  this.getId = function() {
    return this.id;
  }

  this.getBirthDate = function() {
    return this.birthDate;
  }

  this.getName = function() {
    return this.name;
  }
};

var Employee = function(id, birthDate, name, salary, fire=false) {
  Person.call(this, id, birthDate, name);
  this.salary = salary;

  this.getSalary = function() {
    return this.salary;
  }

  this.setSalary = function(salary) {
    this.salary = salary;
  }

  this.getFire = function() {
    return this.fire;
  }

  this.setFire = function(value) {
    id = this.id;
    return empUpd(id, value).then(message => {
      return message;
    })
  }

  this.promote = function(salary) {
      this.salary = salary;
  }
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

var Teacher = function(id, birthDate, name, salary, fire, subject) {
  Employee.call(this, id, birthDate, name, salary,fire);
  this.subject = subject;

  this.getSubject = function() {
    return this.subject;
  }

  this.evaluateStudent = function(student) {
      student.grade = (Math.random()*10).toFixed(2);
  }
 }

Teacher.get = function(id) {
 return teachReq(id).then(teacher => {
   return teacher;
 });
}

Teacher.prototype = Object.create(Employee.prototype);
Teacher.prototype.constructor = Teacher;

var DepartmentHead = function(id, birthDate, name, salary, fire, subject, year) {
  Teacher.call(this, id, birthDate, name, salary, fire, subject);
  this.year = year;


  this.getYears = function() {
    return Date.now().getFullYear() - year;
  }
}

DepartmentHead.get = function(id) {
  return depReq(id).then(dep => {
    return dep;
  });
}


DepartmentHead.prototype = Object.create(Teacher.prototype);
DepartmentHead.prototype.constructor = DepartmentHead;

var Administrator = function(id, birthDate, name, salary, fire, nrSchools) {
  Employee.call(this, id, birthDate, name, salary, fire);
  this.nrSchools = nrSchools;


  this.fireEmployee = function(employee, value) {
    employee.fire = value;
  }
}

Administrator.get = function(id) {
  return adminReq(id).then(admin => {
    return admin;
  });
}

Administrator.prototype = Object.create(Employee.prototype);
Administrator.prototype.constructor = Administrator;

var ProDean = function(id, birthDate, name, salary, fire, nrActiveProjects) {
  Employee.call(this, id, birthDate, name, salary, fire);
  this.nrActiveProjects = nrActiveProjects;

  this.getNrActiveProjects = function() {
    return this.nrActiveProjects;
  }

  this.setNrActiveProjects = function(proj) {
    this.nrActiveProjects = proj;
    id = this.id;
    return projUpd(id, proj).then(message => {
      return message;
    })
  }

  this.projectDone = function() {
    this.setNrActiveProjects(this.nrActiveProjects - 1);
  }

  this.newProject = function() {
    this.setNrActiveProjects(this.nrActiveProjects + 1);
  }
}

ProDean.get = function(id) {
  return proReq(id).then(pro => {
    return pro;
  });
}

ProDean.prototype = Object.create(Employee.prototype);
ProDean.prototype.constructor = ProDean;

var Dean = function(id, birthDate, name, salary, fire, nrActiveProjects, schoolName) {
  ProDean.call(this, id, birthDate, name, salary, fire, nrActiveProjects);
  this.schoolName = schoolName;

  this.assignProject = function(proDean) {
    proDean.newProject();
  }
}

Dean.get = function(id) {
  return deanReq(id).then(dean => {
    return dean;
  });
}

Dean.prototype = Object.create(ProDean.prototype);
Dean.prototype.constructor = Dean;

var Student = function(id, birthDate, name, grade = 0) {
  Person.call(this, id, birthDate, name);
  this.grade = grade;

  this.getGrade = function() {
    return this.grade;
  }

  this.setGrade = function(grade) {
    id = this.id;
    return studUpd(id, grade).then(message => {
      return message;
    })
  }

  this.pass = function() {
    if (this.grade < 5) {
      return 0;
    }
    else {
      return 1;
    }
  }
}

Student.get = function(id) {
  return studReq(id).then(student => {
    return student;
  });
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

module.exports.Teacher = Teacher;
module.exports.ProDean = ProDean;
module.exports.Dean = Dean;
module.exports.Student = Student;
module.exports.DepartmentHead = DepartmentHead;
module.exports.Administrator = Administrator;
