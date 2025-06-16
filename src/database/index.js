const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "dummy_db",
  process.env.DB_USER || "dummy_user",
  process.env.DB_PASS || "dummy_pass",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

if (process.env.SKIP_DB !== 'true') {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ Connected to the database.");
    } catch (error) {
      console.error("❌ Database connection failed:", error.message);
    }
  })();
} else {
  console.log("⚠️ SKIP_DB=true: Database connection skipped.");
}

module.exports = sequelize;
