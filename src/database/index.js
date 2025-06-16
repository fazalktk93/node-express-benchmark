const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,              // External DB host like RDS
    port: process.env.DB_PORT || 3306,      // Default port
    dialect: "mysql",
    logging: false,                         // Set to true for SQL debug logs
  }
);

// Sync models if needed
sequelize.sync();

// Connect to DB unless SKIP_DB is true
if (process.env.SKIP_DB !== 'true') {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ DB connection established");
    } catch (error) {
      console.error("❌ Unable to connect to the database:", error.message);
    }
  })();
} else {
  console.log("⚠️  DB connection skipped (SKIP_DB=true)");
}

module.exports = sequelize;
