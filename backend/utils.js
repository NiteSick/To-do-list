const data = require("./model/data.json");

const todoDatabase = {
  todos: data,
  setTodos: function (newData) {
    this.todos = newData;
  },
};

module.exports = { todoDatabase };
