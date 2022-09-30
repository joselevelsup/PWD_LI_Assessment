import app from "./app";
import sequelize from "./db/connector";

(async () => {
  try {
    await sequelize.authenticate();

    app.listen(8080, () => {
      console.log("Server listening on 8080");
    });
  } catch (e) {
    console.log(e);
    console.log("failed to connect to db");
  }
})();
