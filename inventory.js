db.inventory.insertMany([
  { "_id": 101, "item": "Hoodie", "category": "Apparel", "price": 45.00, "stock": 75 },
  { "_id": 102, "item": "Leather Wallet", "category": "Accessories", "price": 30.50, "stock": 40 },
  { "_id": 103, "item": "Running Shoes", "category": "Footwear", "price": 80.00, "stock": 25 },
  { "_id": 104, "item": "Smartwatch", "category": "Electronics", "price": 120.00, "stock": 15 },
  { "_id": 105, "item": "Wireless Earbuds", "category": "Electronics", "price": 55.99, "stock": 60 }
]);

db.clients.insertMany([
  { "_id": 501, "fullName": "Rahul Sharma", "email": "rahul.sharma@email.com", "phone": "9876543211" },
  { "_id": 502, "fullName": "Sara Khan", "email": "sara.khan@email.com", "phone": "8765432109" },
  { "_id": 503, "fullName": "David Miller", "email": "david.miller@email.com", "phone": "7654321098" },
  { "_id": 504, "fullName": "Emily Davis", "email": "emily.davis@email.com", "phone": "6543210987" },
  { "_id": 505, "fullName": "Michael Brown", "email": "michael.brown@email.com", "phone": "5432109876" }
]);

db.transactions.insertMany([
  { "_id": 201, "client_id": 501, "total": 120.99, "status": "Completed" },
  { "_id": 202, "client_id": 502, "total": 75.50, "status": "Pending" },
  { "_id": 203, "client_id": 503, "total": 200.00, "status": "Shipped" },
  { "_id": 204, "client_id": 504, "total": 45.00, "status": "Delivered" },
  { "_id": 205, "client_id": 505, "total": 150.00, "status": "Processing" }
]);

db.payments.insertMany([
  { "_id": 301, "transaction_id": 201, "amount": 120.99, "method": "UPI", "status": "Completed" },
  { "_id": 302, "transaction_id": 202, "amount": 75.50, "method": "Net Banking", "status": "Pending" },
  { "_id": 303, "transaction_id": 203, "amount": 200.00, "method": "Credit Card", "status": "Completed" },
  { "_id": 304, "transaction_id": 204, "amount": 45.00, "method": "Cash", "status": "Completed" },
  { "_id": 305, "transaction_id": 205, "amount": 150.00, "method": "Debit Card", "status": "Pending" }
]);

db.staff.insertMany([
  { "_id": 401, "name": "Anita Desai", "position": "Store Supervisor", "email": "anita.desai@email.com", "phone": "9988776655" },
  { "_id": 402, "name": "Samuel Lee", "position": "Cashier", "email": "samuel.lee@email.com", "phone": "8877665544" },
  { "_id": 403, "name": "Henry Cooper", "position": "Warehouse Manager", "email": "henry.cooper@email.com", "phone": "7766554433" },
  { "_id": 404, "name": "Olivia Jones", "position": "Customer Representative", "email": "olivia.jones@email.com", "phone": "6655443322" },
  { "_id": 405, "name": "Jason White", "position": "Delivery Coordinator", "email": "jason.white@email.com", "phone": "5544332211" }
]);

// Retrieve all clients who have spent more than $100
db.clients.aggregate([
  { $lookup: { from: "transactions", localField: "_id", foreignField: "client_id", as: "orders" } },
  { $unwind: "$orders" },
  { $match: { "orders.total": { $gt: 100 } } }
]);

// Find all pending transactions
db.transactions.find({ "status": "Pending" });

// Update stock for an item after purchase
db.inventory.updateOne({ "item": "Running Shoes" }, { $inc: { "stock": -1 } });

// Find all payments made through UPI
db.payments.find({ "method": "UPI" });

// Delete all staff members who are no longer working
db.staff.deleteMany({ "position": "Delivery Coordinator" });

// CRUD OPERATIONS

// CREATE: Add a new product to inventory
db.inventory.insertOne({ "_id": 106, "item": "Backpack", "category": "Accessories", "price": 60.00, "stock": 30 });

// READ: Find a specific client by email
db.clients.findOne({ "email": "rahul.sharma@email.com" });

// UPDATE: Modify a transaction status
db.transactions.updateOne({ "_id": 202 }, { $set: { "status": "Completed" } });

// DELETE: Remove a client from the database
db.clients.deleteOne({ "_id": 505 });

// CREATE: Add a new staff member
db.staff.insertOne({ "_id": 406, "name": "Sophia Green", "position": "Sales Associate", "email": "sophia.green@email.com", "phone": "1122334455" });

// READ: Get all transactions for a specific client
db.transactions.find({ "client_id": 501 });

// UPDATE: Increase stock for an item
db.inventory.updateOne({ "item": "Hoodie" }, { $inc: { "stock": 10 } });

// DELETE: Remove a product from inventory
db.inventory.deleteOne({ "item": "Leather Wallet" });


