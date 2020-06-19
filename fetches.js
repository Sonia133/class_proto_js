const fetch = require("node-fetch");

module.exports.studReq = (id) => {
  return fetch('http://localhost:3000/getstudent/' + id).then(stud => {
    return stud.json();
  }).then(data => {
    return data;
  });
}


module.exports.deanReq = (id) => {
  return fetch('http://localhost:3000/getdean/' + id).then(dean => {
    return dean.json();
  }).then(data => {
    return data;
  });
}

module.exports.proReq = (id) => {
  return fetch('http://localhost:3000/getprodean/' + id).then(proDean => {
    return proDean.json();
  }).then(data => {
    return data;
  });
}

module.exports.teachReq = (id) => {
  return fetch('http://localhost:3000/getteacher/' + id).then(teach => {
    return teach.json();
  }).then(data => {
    return data;
  });
}

module.exports.adminReq = (id) => {
  return fetch('http://localhost:3000/getadmin/' + id).then(admin => {
    return admin.json();
  }).then(data => {
    return data;
  });
}

module.exports.depReq = (id) => {
  return fetch('http://localhost:3000/getdephead/' + id).then(dep => {
    return dep.json();
  }).then(data => {
    return data;
  });
}
