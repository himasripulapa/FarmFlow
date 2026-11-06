# LAB 9 & 10: MongoDB Shell (mongosh) Queries Reference Guide

This document contains standard MongoDB Shell (`mongosh`) commands and queries mapped to the FarmFlow database structure.

---

## 1. Database Operations

### Switch / Create Database
```javascript
use farmflow
```

### View Current Database
```javascript
db
```

### Show All Databases
```javascript
show dbs
```

### Drop Current Database
```javascript
db.dropDatabase()
```

---

## 2. Collection Operations

### Explicitly Create Collection with Validation Rules
```javascript
db.createCollection("crops", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "category", "pricePerKg" ],
         properties: {
            name: { bsonType: "string", description: "must be a string and is required" },
            category: { bsonType: "string", description: "crop category" },
            pricePerKg: { bsonType: "number", minimum: 1 }
         }
      }
   }
})
```

### Show Collections
```javascript
show collections
```

### Drop Collection
```javascript
db.crops.drop()
```

---

## 3. CREATE (Insert) Queries

### Insert Single Document
```javascript
db.batches.insertOne({
  batchId: "FF-2026-000001",
  crop: {
    name: "Chilli",
    variety: "Guntur Sannam S4",
    category: "spice"
  },
  farmer: {
    name: "Swathi",
    village: "Guntur Rural",
    district: "Guntur",
    state: "Andhra Pradesh",
    phone: "9848012345"
  },
  quantity: 1500,
  unit: "kg",
  qualityGrade: "A",
  status: "Harvested",
  organic: true,
  createdAt: new Date()
})
```

### Insert Multiple Documents
```javascript
db.mandiPrices.insertMany([
  { crop: "Chilli", market: "Guntur Mandi", state: "Andhra Pradesh", modalPrice: 18500 },
  { crop: "Turmeric", market: "Nizamabad Mandi", state: "Telangana", modalPrice: 14200 },
  { crop: "Paddy", market: "Miryalaguda Mandi", state: "Telangana", modalPrice: 2320 }
])
```

---

## 4. READ (Find) Queries

### Find All Documents in a Collection
```javascript
db.batches.find()
```

### Formatted Pretty Output
```javascript
db.batches.find().pretty()
```

### Equality Query
```javascript
db.batches.find({ status: "Harvested" })
```

### Nested Object Query
```javascript
db.batches.find({ "crop.name": "Chilli" })
```

### Comparison Operators ($gt, $gte, $lt, $lte, $in)
```javascript
// Batches with quantity greater than or equal to 1000 kg
db.batches.find({ quantity: { $gte: 1000 } })

// Batches with status in either 'In Transit' or 'At Retailer'
db.batches.find({ status: { $in: ["In Transit", "At Retailer"] } })
```

### Logical Operators ($and, $or)
```javascript
db.batches.find({
  $and: [
    { "crop.name": "Chilli" },
    { organic: true }
  ]
})
```

---

## 5. UPDATE Queries

### Update Single Document ($set)
```javascript
db.batches.updateOne(
  { batchId: "FF-2026-000001" },
  {
    $set: {
      status: "At Collection Center",
      qualityNotes: "Passed moisture testing (< 9%)"
    }
  }
)
```

### Update with Array Push ($push)
```javascript
db.batches.updateOne(
  { batchId: "FF-2026-000001" },
  {
    $push: {
      stageHistory: {
        stage: "collectionCenter",
        handlerName: "Guntur Hub Manager",
        timestamp: new Date().toISOString(),
        status: "At Collection Center"
      }
    }
  }
)
```

### Update Many Documents
```javascript
db.batches.updateMany(
  { "farmer.state": "Andhra Pradesh" },
  { $set: { verifiedRegion: true } }
)
```

---

## 6. DELETE (Remove) Queries

### Delete Single Document
```javascript
db.batches.deleteOne({ batchId: "FF-2026-000001" })
```

### Delete Multiple Documents
```javascript
db.transactions.deleteMany({ status: "Failed" })
```

---

## 7. Sort, Limit, and Skip Queries

### Sort Ascending (1) and Descending (-1)
```javascript
// Sort by quantity descending
db.batches.find().sort({ quantity: -1 })
```

### Pagination (Skip & Limit)
```javascript
// Page 2 with page size = 5
db.batches.find()
  .sort({ createdAt: -1 })
  .skip(5)
  .limit(5)
```

---

## 8. Indexing (createIndex)

### Unique Index
```javascript
db.batches.createIndex({ batchId: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 }, { unique: true })
```

### Compound Index
```javascript
db.batches.createIndex({ "crop.name": 1, status: 1 })
```

### Text Index for Full-Text Search
```javascript
db.batches.createIndex({ "crop.name": "text", "farmer.name": "text" })
```

### View Indexes on Collection
```javascript
db.batches.getIndexes()
```

---

## 9. Aggregation Pipeline (aggregate)

### Grouping Batches by Status (Funnel Pipeline)
```javascript
db.batches.aggregate([
  {
    $group: {
      _id: "$status",
      totalBatches: { $sum: 1 },
      totalQuantityKg: { $sum: "$quantity" }
    }
  },
  {
    $sort: { totalBatches: -1 }
  }
])
```

### Grouping by Crop with Average Price and Total Volume
```javascript
db.batches.aggregate([
  {
    $group: {
      _id: "$crop.name",
      cropCount: { $sum: 1 },
      totalVolumeKg: { $sum: "$quantity" },
      avgPricePerUnit: { $avg: "$pricePerUnit" }
    }
  },
  {
    $sort: { totalVolumeKg: -1 }
  }
])
```

### Monthly Throughput Trend ($substr & $group)
```javascript
db.batches.aggregate([
  {
    $group: {
      _id: { $substr: ["$harvestDate", 0, 7] },
      monthlyVolume: { $sum: "$quantity" }
    }
  },
  {
    $sort: { _id: 1 }
  }
])
```
