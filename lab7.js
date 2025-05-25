// 1. Sample Data
db.employees.insertMany([
  { emp_id: 1, name: "Alice", department: "HR", salary: 50000 },
  { emp_id: 2, name: "Bob", department: "Finance", salary: 75000 },
  { emp_id: 3, name: "Charlie", department: "IT", salary: 48000 },
  { emp_id: 4, name: "David", department: "IT", salary: 62000 },
  { emp_id: 5, name: "Eva", department: "HR", salary: 58000 }
]);

// 2. Define Map Function
var mapFunction = function() {
  emit(this.department, this.salary);
};

// 3. Define Reduce Function
var reduceFunction = function(department, salaries) {
  return Array.sum(salaries);
};

// 4. Run MapReduce
db.employees.mapReduce(
  mapFunction,
  reduceFunction,
  {
    out: "total_salary_per_dept"
  }
);

// 5. View Results
db.total_salary_per_dept.find();
