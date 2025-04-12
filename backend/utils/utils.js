const data = require("../model/data.json");
const userData = require("../model/user.json");

const todoDatabase = {
  todos: data,
  setTodos: function (newData) {
    this.todos = newData;
  },
};

const userDatabase = {
  users: userData,
  setUsers: function (newData) {
    this.users = newData;
  },
};

module.exports = { todoDatabase, userDatabase };
