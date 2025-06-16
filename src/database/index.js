const { Sequelize } = require("sequelize");

// Set up Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // Set to true if you want SQL query logs
  }
);

// Synchronize models if needed (optional for basic use)
sequelize.sync();

// Attempt DB connection unless SKIP_DB is set to true
if (process.env.SKIP_DB !== 'true') {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ DB connection established successfully.");
    } catch (error) {
      console.error("❌ DB connection failed:", error.message);
    }
  })();
} else {
  console.log("⚠️  SKIP_DB is set to true. Database connection skipped.");
}

module.exports = sequelize;
