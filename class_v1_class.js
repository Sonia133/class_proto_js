'use strict';

var {studUpd, studReq,teachReq,proReq,adminReq,deanReq,depReq} = require('./fetches.js');

class Person {
  constructor(id, birthDate, name) {
    this._id = id;
    this._birthDate = birthDate;
    this._name = name;
  }

  get birthDate() {
		return this._birthDate;
	}

  get name() {
  	return this._name;
	}

  get age() {
    const date = new Date();
		return Math.floor(Math.abs(date - Date.parse(this._birthDate)) / (1000*60*60*24*365));
	}

  get Id() {
    return this._id;
  }

}

class Employee extends Person {
  constructor(id, birthDate, name, salary, fire = false) {
    super(id, birthDate, name);
    this._salary = salary;
  }

  get salary() {
    return this._salary;
  }

  set salary(salary) {
    this._salary = salary;
  }

  get fire() {
    return this._fire;
  }

  set fire(value) {
    this._fire = value;
  }

  promote(salary) {
      this.salary = salary;
  }

}

class Teacher extends Employee {
  constructor(id, birthDate, name, salary, fire, subject) {
    super(id, birthDate, name, salary, fire);
    this._subject = subject;
  }

  static get(id) {
    return teachReq(id).then(teacher => {
      return teacher;
    });
  }

  get subject() {
    return this._subject;
  }

  evaluateStudent(student) {
      student.grade = (Math.random()*10).toFixed(2);
  }

 }

module.exports.DepartmentHead =  class DepartmentHead extends Teacher {
  constructor(id, birthDate, name, salary, fire, subject, year) {
    super(id, birthDate, name, salary, fire, subject);
    this._year = year;
  }

  static get(id) {
    return depReq(id).then(dep => {
      return dep;
    });
  }

  get years() {
    return Date.now().getFullYear() - year;
  }

}

module.exports.Administrator = class Administrator extends Employee {
  constructor(id, birthDate, name, salary, fire, nrSchools) {
    super(id, birthDate, name, salary, fire);
    this._nrSchools = nrSchools;
  }

  fireEmployee(employee, value) {
    employee.fire = value;
  }

  static get(id) {
    return adminReq(id).then(admin => {
      return admin;
    });
  }

}

class ProDean extends Employee {
  constructor(id, birthDate, name, salary, fire, nrActiveProjects) {
    super(id, birthDate, name, salary, fire);
    this._nrActiveProjects = nrActiveProjects;
  }

  static get(id) {
    return proReq(id).then(pro => {
      return pro;
    });
  }

  get nrActiveProjects() {
    return this._nrActiveProjects;
  }

  set nrActiveProjects(proj) {
    this._nrActiveProjects = proj;
  }

  projectDone() {
    this.nrActiveProjects = this._nrActiveProjects - 1;
  }

  newProject() {
    this.nrActiveProjects = this._nrActiveProjects + 1;
  }

}

module.exports.Dean = class Dean extends ProDean {
  constructor(id, birthDate, name, salary, fire, nrActiveProjects, schoolName) {
    super(id, birthDate, name, salary, fire, nrActiveProjects);
    this._schoolName = schoolName;
  }

  static get(id) {
    return deanReq(id).then(dean => {
      return dean;
    });
  }

  assignProject(proDean) {
    proDean.newProject();
  }

}

module.exports.Student = class Student extends Person {
  constructor(id, birthDate, name, grade = 0) {
    super(id, birthDate, name);
    this.grade = grade;
  }

  static get(id) {
    return studReq(id).then(student => {
      return student;
    });
  }

  get grade() {
    return this._grade;
  }

  set grade(grade) {
    this._grade = grade;
  }

  pass() {
    if (this._grade < 5) {
      return 0;
    }
    else {
      return 1;
    }
  }
}

module.exports.Teacher = Teacher;
module.exports.ProDean = ProDean;
