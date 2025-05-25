db.universities.insertMany([
  {
    country: 'Spain',
    city: 'Salamanca',
    name: 'USAL',
    location: {
      type: 'Point',
      coordinates: [-5.6722512, 40.9607792]
    },
    students: [
      { year: 2014, number: 24774 },
      { year: 2015, number: 23166 },
      { year: 2016, number: 21913 },
      { year: 2017, number: 21715 }
    ]
  },
  {
    country: 'Spain',
    city: 'Salamanca',
    name: 'UPSA',
    location: {
      type: 'Point',
      coordinates: [-5.6691191, 40.9631732]
    },
    students: [
      { year: 2014, number: 4788 },
      { year: 2015, number: 4821 },
      { year: 2016, number: 6550 },
      { year: 2017, number: 6125 }
    ]
  }
]);

// a. $match – Find universities in Salamanca
db.universities.aggregate([
  { $match: { city: "Salamanca" } }
]);

// b. $project – Show only name and student count for 2017
db.universities.aggregate([
  {
    $project: {
      name: 1,
      student2017: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$students",
              as: "student",
              cond: { $eq: ["$$student.year", 2017] }
            }
          },
          0
        ]
      }
    }
  }
]);

// c. $unwind – Flatten student data
db.universities.aggregate([
  { $unwind: "$students" }
]);

// d. $group – Total students per year across all universities
db.universities.aggregate([
  { $unwind: "$students" },
  {
    $group: {
      _id: "$students.year",
      totalStudents: { $sum: "$students.number" }
    }
  }
]);

// e. $sort – Sort universities by name
db.universities.aggregate([
  { $sort: { name: 1 } }
]);

// f. $limit – Get only 1 university
db.universities.aggregate([
  { $limit: 1 }
]);

// g. $out – Output student data to a new collection
db.universities.aggregate([
  { $unwind: "$students" },
  { $out: "student_stats" }
]);

db.courses.insertMany([
  {
    university: "USAL",
    course_name: "Computer Science",
    duration_years: 4,
    enrolled: 1200
  },
  {
    university: "USAL",
    course_name: "Law",
    duration_years: 5,
    enrolled: 900
  },
  {
    university: "UPSA",
    course_name: "Psychology",
    duration_years: 4,
    enrolled: 650
  },
  {
    university: "UPSA",
    course_name: "Business Administration",
    duration_years: 4,
    enrolled: 700
  }
]);

// a. $match – Courses with more than 800 students
db.courses.aggregate([
  { $match: { enrolled: { $gt: 800 } } }
]);

// b. $project – Show only course name and duration
db.courses.aggregate([
  {
    $project: {
      _id: 0,
      course_name: 1,
      duration_years: 1
    }
  }
]);

// c. $group – Total enrollment per university
db.courses.aggregate([
  {
    $group: {
      _id: "$university",
      totalEnrolled: { $sum: "$enrolled" }
    }
  }
]);

// d. $sort – Sort by number of students descending
db.courses.aggregate([
  { $sort: { enrolled: -1 } }
]);

// e. $limit – Top 2 most enrolled courses
db.courses.aggregate([
  { $sort: { enrolled: -1 } },
  { $limit: 2 }
]);

// f. $unwind – Not needed since no arrays

// g. $out – Store most popular courses in a new collection
db.courses.aggregate([
  { $match: { enrolled: { $gt: 800 } } },
  { $out: "popular_courses" }
]);


db.universities.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "name",
      foreignField: "university",
      as: "offered_courses"
    }
  }
]);
