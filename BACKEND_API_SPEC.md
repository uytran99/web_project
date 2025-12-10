# Backend API Specification for IoT Heart Rate Admin Dashboard

This document describes the API endpoints that the backend needs to implement for the web admin dashboard to function.

## Base URL

```
http://localhost:3001/api
```

## Response Format

All API responses should have a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response

```json
{
    "success": false,
    "message": "Error message",
    "error": "Error details (optional)"
}
```

---

## 1. Dashboard API

### GET `/api/dashboard/stats`

Get overview statistics for the dashboard.

**Response:**

```json
{
    "success": true,
    "data": {
        "totalDevices": 10,
        "activeDevices": 7,
        "todayReadings": 1250,
        "averageHeartRate": 72.5,
        "abnormalAlerts": 15
    }
}
```

**Logic:**

-   `totalDevices`: Total number of devices in the database
-   `activeDevices`: Number of devices with status = "online" or lastConnected within the last 5 minutes
-   `todayReadings`: Number of heart rate readings today (based on timestamp)
-   `averageHeartRate`: Average heart rate of all readings today
-   `abnormalAlerts`: Number of readings with status = "abnormal" today

---

## 2. Devices API

### GET `/api/devices`

Get list of all devices.

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "deviceId": "DEV001",
            "name": "IoT Device 1",
            "status": "online",
            "lastConnected": "2024-01-15T10:30:00.000Z",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-15T10:30:00.000Z"
        }
    ]
}
```

### GET `/api/devices/:id`

Get details of a device.

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "507f1f77bcf86cd799439011",
        "deviceId": "DEV001",
        "name": "IoT Device 1",
        "status": "online",
        "lastConnected": "2024-01-15T10:30:00.000Z",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    }
}
```

### POST `/api/devices`

Create a new device.

**Request Body:**

```json
{
    "deviceId": "DEV002",
    "name": "IoT Device 2",
    "status": "offline"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "507f1f77bcf86cd799439012",
        "deviceId": "DEV002",
        "name": "IoT Device 2",
        "status": "offline",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "message": "Device created successfully"
}
```

### PUT `/api/devices/:id`

Update a device.

**Request Body:**

```json
{
    "name": "Updated Device Name",
    "status": "online"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "507f1f77bcf86cd799439011",
        "deviceId": "DEV001",
        "name": "Updated Device Name",
        "status": "online",
        "lastConnected": "2024-01-15T10:30:00.000Z",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-15T11:00:00.000Z"
    },
    "message": "Device updated successfully"
}
```

### DELETE `/api/devices/:id`

Delete a device.

**Response:**

```json
{
    "success": true,
    "message": "Device deleted successfully"
}
```

---

## 3. Heart Rate Data API

### GET `/api/heart-rate`

Get list of heart rate data with pagination and filters.

**Query Parameters:**

-   `deviceId` (string, optional): Filter by deviceId
-   `startDate` (ISO string, optional): Start date (e.g., "2024-01-15T00:00:00.000Z")
-   `endDate` (ISO string, optional): End date
-   `minHeartRate` (number, optional): Minimum heart rate
-   `maxHeartRate` (number, optional): Maximum heart rate
-   `status` (string, optional): "normal" or "abnormal"
-   `page` (number, optional): Page number (default: 1)
-   `limit` (number, optional): Number of items per page (default: 10)

**Example Request:**

```
GET /api/heart-rate?deviceId=DEV001&startDate=2024-01-15T00:00:00.000Z&endDate=2024-01-15T23:59:59.999Z&page=1&limit=10
```

**Response:**

```json
{
    "success": true,
    "data": {
        "data": [
            {
                "_id": "507f1f77bcf86cd799439021",
                "deviceId": "DEV001",
                "heartRate": 75,
                "timestamp": "2024-01-15T10:30:00.000Z",
                "status": "normal",
                "metadata": {}
            },
            {
                "_id": "507f1f77bcf86cd799439022",
                "deviceId": "DEV001",
                "heartRate": 45,
                "timestamp": "2024-01-15T10:31:00.000Z",
                "status": "abnormal",
                "metadata": {
                    "battery": 85,
                    "signal": "strong"
                }
            }
        ],
        "total": 1250,
        "page": 1,
        "limit": 10
    }
}
```

**Filtering Logic:**

-   If `deviceId` is provided: Filter by deviceId
-   If `startDate` and `endDate` are provided: Filter by time range (timestamp)
-   If `minHeartRate` is provided: Filter heartRate >= minHeartRate
-   If `maxHeartRate` is provided: Filter heartRate <= maxHeartRate
-   If `status` is provided: Filter by status ("normal" or "abnormal")
-   Pagination: Skip = (page - 1) \* limit, Limit = limit

### GET `/api/heart-rate/:id`

Get details of a heart rate record.

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "507f1f77bcf86cd799439021",
        "deviceId": "DEV001",
        "heartRate": 75,
        "timestamp": "2024-01-15T10:30:00.000Z",
        "status": "normal",
        "metadata": {
            "battery": 90,
            "signal": "strong",
            "temperature": 36.5
        }
    }
}
```

### DELETE `/api/heart-rate/:id`

Delete a heart rate record.

**Response:**

```json
{
    "success": true,
    "message": "Heart rate data deleted successfully"
}
```

---

## MongoDB Schema

### Collection: `devices`

```javascript
{
  _id: ObjectId,
  deviceId: String (unique, required),
  name: String (required),
  status: String (enum: ['online', 'offline'], default: 'offline'),
  lastConnected: Date (optional),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### Collection: `heartrates` or `heart_rate_data`

```javascript
{
  _id: ObjectId,
  deviceId: String (required, index),
  heartRate: Number (required, min: 0, max: 300),
  timestamp: Date (required, index),
  status: String (enum: ['normal', 'abnormal'], required),
  metadata: Object (optional, default: {})
}
```

**Indexes to create:**

-   `heartrates`: Index on `deviceId`
-   `heartrates`: Index on `timestamp`
-   `heartrates`: Compound index on `deviceId` and `timestamp`
-   `devices`: Unique index on `deviceId`

---

## Example Implementation (Node.js + Express + MongoDB)

### routes/dashboard.js

```javascript
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

router.get("/stats", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const devicesCollection = db.collection("devices");
        const heartratesCollection = db.collection("heartrates");

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Total devices
        const totalDevices = await devicesCollection.countDocuments();

        // Active devices (online or connected within 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const activeDevices = await devicesCollection.countDocuments({
            $or: [{ status: "online" }, { lastConnected: { $gte: fiveMinutesAgo } }],
        });

        // Today readings
        const todayReadings = await heartratesCollection.countDocuments({
            timestamp: { $gte: todayStart, $lte: todayEnd },
        });

        // Average heart rate today
        const todayData = await heartratesCollection
            .find({
                timestamp: { $gte: todayStart, $lte: todayEnd },
            })
            .toArray();

        const averageHeartRate = todayData.length > 0 ? todayData.reduce((sum, item) => sum + item.heartRate, 0) / todayData.length : 0;

        // Abnormal alerts today
        const abnormalAlerts = await heartratesCollection.countDocuments({
            timestamp: { $gte: todayStart, $lte: todayEnd },
            status: "abnormal",
        });

        res.json({
            success: true,
            data: {
                totalDevices,
                activeDevices,
                todayReadings,
                averageHeartRate: Math.round(averageHeartRate * 10) / 10,
                abnormalAlerts,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching dashboard stats",
            error: error.message,
        });
    }
});

module.exports = router;
```

### routes/devices.js

```javascript
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

// GET all devices
router.get("/", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const devices = await db.collection("devices").find({}).toArray();
        res.json({ success: true, data: devices });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching devices",
            error: error.message,
        });
    }
});

// GET device by ID
router.get("/:id", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const device = await db.collection("devices").findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found",
            });
        }

        res.json({ success: true, data: device });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching device",
            error: error.message,
        });
    }
});

// POST create device
router.post("/", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { deviceId, name, status } = req.body;

        if (!deviceId || !name) {
            return res.status(400).json({
                success: false,
                message: "deviceId and name are required",
            });
        }

        const device = {
            deviceId,
            name,
            status: status || "offline",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("devices").insertOne(device);
        device._id = result.insertedId;

        res.status(201).json({
            success: true,
            data: device,
            message: "Device created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating device",
            error: error.message,
        });
    }
});

// PUT update device
router.put("/:id", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const updateData = {
            ...req.body,
            updatedAt: new Date(),
        };

        const result = await db.collection("devices").findOneAndUpdate({ _id: new ObjectId(req.params.id) }, { $set: updateData }, { returnDocument: "after" });

        if (!result.value) {
            return res.status(404).json({
                success: false,
                message: "Device not found",
            });
        }

        res.json({
            success: true,
            data: result.value,
            message: "Device updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating device",
            error: error.message,
        });
    }
});

// DELETE device
router.delete("/:id", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const result = await db.collection("devices").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Device not found",
            });
        }

        res.json({
            success: true,
            message: "Device deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting device",
            error: error.message,
        });
    }
});

module.exports = router;
```

### routes/heartRate.js

```javascript
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

// GET all heart rate data with filters
router.get("/", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { deviceId, startDate, endDate, minHeartRate, maxHeartRate, status, page = 1, limit = 10 } = req.query;

        // Build filter query
        const filter = {};

        if (deviceId) filter.deviceId = deviceId;

        if (startDate || endDate) {
            filter.timestamp = {};
            if (startDate) filter.timestamp.$gte = new Date(startDate);
            if (endDate) filter.timestamp.$lte = new Date(endDate);
        }

        if (minHeartRate || maxHeartRate) {
            filter.heartRate = {};
            if (minHeartRate) filter.heartRate.$gte = Number(minHeartRate);
            if (maxHeartRate) filter.heartRate.$lte = Number(maxHeartRate);
        }

        if (status) filter.status = status;

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        const limitNum = Number(limit);

        // Get data and total count
        const [data, total] = await Promise.all([db.collection("heartrates").find(filter).sort({ timestamp: -1 }).skip(skip).limit(limitNum).toArray(), db.collection("heartrates").countDocuments(filter)]);

        res.json({
            success: true,
            data: {
                data,
                total,
                page: Number(page),
                limit: limitNum,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching heart rate data",
            error: error.message,
        });
    }
});

// GET heart rate by ID
router.get("/:id", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const data = await db.collection("heartrates").findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Heart rate data not found",
            });
        }

        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching heart rate data",
            error: error.message,
        });
    }
});

// DELETE heart rate data
router.delete("/:id", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const result = await db.collection("heartrates").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Heart rate data not found",
            });
        }

        res.json({
            success: true,
            message: "Heart rate data deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting heart rate data",
            error: error.message,
        });
    }
});

module.exports = router;
```

### app.js (Main file)

```javascript
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "iot_heart_rate";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
MongoClient.connect(MONGODB_URI)
    .then((client) => {
        console.log("Connected to MongoDB");
        db = client.db(DB_NAME);
        app.locals.db = db;

        // Create indexes
        db.collection("heartrates").createIndex({ deviceId: 1 });
        db.collection("heartrates").createIndex({ timestamp: -1 });
        db.collection("heartrates").createIndex({ deviceId: 1, timestamp: -1 });
        db.collection("devices").createIndex({ deviceId: 1 }, { unique: true });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Routes
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/devices", require("./routes/devices"));
app.use("/api/heart-rate", require("./routes/heartRate"));

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Important Notes

1. **CORS**: Ensure the backend allows CORS from the frontend (http://localhost:3000)
2. **Date Format**: Use ISO 8601 format for all dates (YYYY-MM-DDTHH:mm:ss.sssZ)
3. **Status Logic**:
    - Heart rate status: "normal" if 60-100 BPM, "abnormal" if < 60 or > 100
    - Device status: "online" if lastConnected within 5 minutes, "offline" otherwise
4. **Error Handling**: Always return consistent error format
5. **Validation**: Validate input data before saving to database
6. **Pagination**: Default page=1, limit=10 if no query params provided
