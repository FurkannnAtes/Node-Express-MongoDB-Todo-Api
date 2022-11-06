const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Veritabanina Basariyla Baglandi");
  })
  .catch((err) => {
    console.log("Veritabanina baglanilamadi :" + err);
  });
