db.books.insertMany([
    {isbn:1, bname:'basic of c', author:['alam','faisal'], year:2016,publisher:'ms publishers', price:499},
    {isbn:2, bname:'basic of java', author:['aniketh','alam'], year:2017,publisher:'md publishers', price:799},
    {isbn:3, bname:'basic of python', author:['alam','aniketh'], year:2019,publisher:'ms publishers', price:899},
    {isbn:4, bname:'basic of c++', author:['alam','faisal'], year:2012,publisher:'mp publishers', price:399},
    {isbn:5, bname:'basic of java script', author:['alam','obed'], year:2018,publisher:'ms publishers', price:1199},
    {isbn:6, bname:'basic of front end', author:['faisal','alam'], year:2020,publisher:'mr publishers', price:999}
]);


db.books.find();

db.books.find({}, {bname: 1, author: 1, _id: 0});

db.books.find({publisher:'ms publishers'});

db.books.find({ year: { $gte: 2018, $lte: 2020 } });

db.books.find({ bname: "basic of java" }, { publisher: 1, _id: 0 });

db.books.find({bname: "basic of java script"}, {price:1, _id: 0 });

db.books.find().sort({ price: -1 }).limit(3);

db.books.find(
    { author: { $all: ['alam', 'faisal'] } },
    { bname: 1, _id: 0 }
);

db.books.find(
    { author: { $not: { $all: ['alam', 'faisal'] } } },
    { bname: 1, _id: 0 }
);


db.books.find(
    { author: { $all: ['alam', 'aniketh'] } }
).sort({ year: 1 }).limit(1);


db.books.find().skip(2);
