//i.
db.scholars.insertMany([
{ URN: "S001", sname: "Alice", program: "Computer Science", courseType: "fulltime", researchArea: "AI" },
{ URN: "S002", sname: "Bob", program: "Mathematics", courseType: "parttime", researchArea: "Algebra" },
{ URN: "S003", sname: "Charlie", program: "Computer Science", courseType: "fulltime", researchArea: "Networks" },
{ URN: "S004", sname: "David", program: "Physics", courseType: "parttime", researchArea: "Quantum Mechanics" },
{ URN: "S005", sname: "Eve", program: "Computer Science", courseType: "parttime", researchArea: "AI" },
{ URN: "S006", sname: "Frank", program: "Mathematics", courseType: "fulltime", researchArea: "Topology" },
{ URN: "S007", sname: "Grace", program: "Chemistry", courseType: "fulltime", researchArea: "Organic Chemistry" },
{ URN: "S008", sname: "Heidi", program: "Computer Science", courseType: "fulltime", researchArea: "AI" },
{ URN: "S009", sname: "Ivan", program: "Mathematics", courseType: "parttime", researchArea: "Statistics" },
{ URN: "S010", sname: "Judy", program: "Computer Science", courseType: "fulltime", researchArea: "Cybersecurity" }
]);

//2.	Queries

//ii.	Display all the documents

db.scholars.find().pretty();

//iii.	Display all the scholars in Computer Science

db.scholars.find({ program: "Computer Science" });

//iv.	Display scholars' names alphabetically

db.scholars.find({}, { sname: 1, _id: 0 }).sort({ sname: 1 });
 
//v.	Display the first 5 scholars

db.scholars.find().limit(5);

//vi.	Display the number of scholars in Mathematics

db.scholars.countDocuments({ program: "Mathematics" });

//vii.	Display all the distinct Programs

db.scholars.distinct("program");

//viii.	Display Computer Science scholars doing research full time

db.scholars.find({ program: "Computer Science", courseType: "fulltime" });
