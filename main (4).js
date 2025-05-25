// 1. Insert employees collection
db.employees.insertMany([
  {
    emp_id: 101, name: "Alice", age: 30,
    salary: 50000, department: "HR", join_year: 2018,
    skills: ["communication", "conflict resolution"]
  },
  {
    emp_id: 102, name: "Bob", age: 45,
    salary: 75000, department: "Finance", join_year: 2015,
    skills: ["accounting", "analysis"]
  },
  {
    emp_id: 103, name: "Charlie", age: 28,
    salary: 48000, department: "IT", join_year: 2020,
    skills: ["JavaScript", "MongoDB"]
  },
  {
    emp_id: 104, name: "David", age: 35,
    salary: 62000, department: "IT", join_year: 2016,
    skills: ["Java", "Python"]
  }
]);

// 2. Insert departments collection
db.departments.insertMany([
  { dept_id: 1, name: "HR", location: "New York" },
  { dept_id: 2, name: "Finance", location: "London" },
  { dept_id: 3, name: "IT", location: "Berlin" }
]);

// 3. Aggregation Queries

// a. $match – Employees in IT department
db.employees.aggregate([
  { $match: { department: "IT" } }
]);

// b. $project – Show only names and salaries
db.employees.aggregate([
  { $project: { _id: 0, name: 1, salary: 1 } }
]);

// c. $group – Total and average salary by department
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      totalSalary: { $sum: "$salary" },
      avgSalary: { $avg: "$salary" }
    }
  }
]);

// d. $sort – Sort employees by salary descending
db.employees.aggregate([
  { $sort: { salary: -1 } }
]);

// e. $limit – Top 2 highest paid employees
db.employees.aggregate([
  { $sort: { salary: -1 } },
  { $limit: 2 }
]);

// f. $unwind – Unwind skills array
db.employees.aggregate([
  { $unwind: "$skills" }
]);

// g. $out – Store high earners into a new collection
db.employees.aggregate([
  { $match: { salary: { $gt: 60000 } } },
  { $out: "high_earners" }
]);

// h. $lookup – Join with departments to get location info
db.employees.aggregate([
  {
    $lookup: {
      from: "departments",
      localField: "department",
      foreignField: "name",
      as: "dept_info"
    }
  }
]);

// i. $count – Total number of employees
db.employees.aggregate([
  { $count: "total_employees" }
]);

// j. $addFields – Add experience (years since joining)
db.employees.aggregate([
  {
    $addFields: {
      experience: { $subtract: [2025, "$join_year"] }
    }
  }
]);
