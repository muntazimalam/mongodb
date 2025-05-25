// 1. Create a Sample Collection
db.employees.insertMany([
  {
    emp_id: 1, name: "Alice",
    department: "HR",
    age: 30,
    salary: 50000
  },
  {
    emp_id: 2, name: "Bob",
    department: "Finance",
    age: 45,
    salary: 75000
  },
  {
    emp_id: 3, name: "Charlie",
    department: "IT",
    age: 28,
    salary: 48000
  },
  {
    emp_id: 4, name: "David",
    department: "IT",
    age: 35,
    salary: 62000
  },
  {
    emp_id: 5, name: "Eva",
    department: "HR",
    age: 40,
    salary: 58000
  }
]);

// 2. Implement Indexing

// a. Unique index on emp_id
db.employees.createIndex({ emp_id: 1 }, { unique: true });

// b. Index on department for faster filtering
db.employees.createIndex({ department: 1 });

// c. Compound index on department and salary (department ASC, salary DESC)
db.employees.createIndex({ department: 1, salary: -1 });

// 3. Check All Indexes on employees Collection
db.employees.getIndexes();

// 4. Use Explain to See Index Usage
db.employees.find({ department: "IT" }).explain("executionStats");
