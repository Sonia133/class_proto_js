const fetch = require("node-fetch");
BaseApiPath = 'http://localhost:3000/';

module.exports.studReq = (id) => {
  return fetch(BaseApiPath + 'getstudent/' + id).then(stud => {
    return stud.json();
  }).then(data => {
    return data;
  });
}

module.exports.studUpd = (id, grade) => {
  return fetch(BaseApiPath + 'updateStudent/' + id + '/' + grade).then(message => {
    return message;
  });
}

module.exports.empUpd = (id, value) => {
  return fetch(BaseApiPath + 'updateEmployee/' + id + '/' + value).then(message => {
    return message;
  });
}

module.exports.projUpd = (id, proj) => {
  return fetch(BaseApiPath + 'updateProjects/' + id + '/' + proj).then(message => {
    return message;
  });
}

module.exports.deanReq = (id) => {
  return fetch(BaseApiPath + 'getdean/' + id).then(dean => {
    return dean.json();
  }).then(data => {
    return data;
  });
}

module.exports.proReq = (id) => {
  return fetch(BaseApiPath + 'getprodean/' + id).then(proDean => {
    return proDean.json();
  }).then(data => {
    return data;
  });
}

module.exports.teachReq = (id) => {
  return fetch(BaseApiPath + 'getteacher/' + id).then(teach => {
    return teach.json();
  }).then(data => {
    return data;
  });
}

module.exports.adminReq = (id) => {
  return fetch(BaseApiPath + 'getadmin/' + id).then(admin => {
    return admin.json();
  }).then(data => {
    return data;
  });
}

module.exports.depReq = (id) => {
  return fetch(BaseApiPath + 'getdephead/' + id).then(dep => {
    return dep.json();
  }).then(data => {
    return data;
  });
}
