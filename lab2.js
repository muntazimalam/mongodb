//i.	Insert 10 documents:
use EmployeeDB;

db.employees.insertMany([
{
eid: "E001", ename: "Alice", dept: "HR", desig: "Manager", salary: 60000, yoj: 2015, address: { dno: "12", street: "Maple St", locality: "North", city: "New York" }
},
{
eid: "E002", ename: "Bob", dept: "IT", desig: "Developer", salary: 70000, yoj: 2018, address: { dno: "45", street: "Pine St", locality: "East", city: "Los Angeles" }
},
{
eid: "E003", ename: "Charlie", dept: "IT", desig: "Developer", salary: 65000, yoj: 2020, address: { dno: "67", street: "Elm St", locality: "South", city: "Chicago" }
},
{
eid: "E004", ename: "David", dept: "Sales", desig: "Executive", salary: 50000, yoj: 2016, address: { dno: "89", street: "Oak St", locality: "West", city: "Houston" }
},
{
eid: "E005", ename: "Eve", dept: "Finance", desig: "Analyst", salary: 55000, yoj: 2019, address: { dno: "101", street: "Cedar St", locality: "Central", city: "Phoenix" }
 
},
{
eid: "E006", ename: "Frank", dept: "HR", desig: "Recruiter", salary: 48000, yoj: 2021, address: { dno: "34", street: "Ash St", locality: "North", city: "Dallas" }
},
{
eid: "E007", ename: "Grace", dept: "IT", desig: "Tester", salary: 52000, yoj: 2022, address: { dno: "56", street: "Birch St", locality: "East", city: "San Diego" }
},
{
eid: "E008", ename: "Heidi", dept: "Sales", desig: "Executive", salary: 53000, yoj: 2017, address: { dno: "78", street: "Spruce St", locality: "West", city: "Austin" }
},
{
eid: "E009", ename: "Ivan", dept: "Finance", desig: "Accountant", salary: 75000, yoj: 2014, address: { dno: "90", street: "Palm St", locality: "South", city: "Seattle" }
},
{
eid: "E010", ename: "Judy", dept: "IT", desig: "Developer", salary: 80000, yoj: 2013, address: { dno: "102", street: "Willow St", locality: "Central", city: "Boston" }
}
]);

//ii.	Display all the employees with salary in range (50000, 75000):

db.employees.find({ salary: { $gt: 50000, $lt: 75000 } });

//iii.	Display all the employees with designation.

db.employees.find({ desig: { $exists: true, $ne: null } });

//iv.	Display the Salary of any one employee

db.employees.findOne({}, { ename: 1, salary: 1, _id: 0 });

//V. Update the salary of developers by 5000 increment

db.employees.updateMany(
{ desig: "Developer" },
{ $inc: { salary: 5000 } }
);

//vi.	Add field age to employee "XXX"
 
db.employees.updateOne(
{ ename: "Bob" },
{ $set: { age: 30 } }
);


//vii.	Remove YOJ from "XXX"

db.employees.updateOne(
{ ename: "Bob" },
{ $unset: { yoj: "" } }
);


//viii.	Add an array field project to "XXX"

db.employees.updateOne(
{ ename: "Bob" },
{ $set: { project: ["p1"] } }
);


//ix.	Add p2 and p3 project to "XXX"

db.employees.updateOne(
{ ename: "Bob" },
{ $push: { project: { $each: ["p2", "p3"] } } }
);


//x.	Add a new embedded object "contacts" with "email" and "phone" as array objects to "XXX"

db.employees.updateOne(
{ ename: "Bob" },
{
$set: { contacts: {
email: ["bob@example.com"], phone: []
}
}
}
);
 
//xi.	Add two phone numbers to "XXX"

db.employees.updateOne(
{ ename: "Bob" },
{ $push: { "contacts.phone": { $each: ["1234567890", "9876543210"] } } }
);
