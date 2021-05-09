const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.pw9zu.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (name && number) {
  const phonebook = new Phonebook({
    name: name,
    number: number,
  });

  phonebook.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Phonebook.find({}).then((result) => {
    console.log(`phonebook:`);
    result.forEach((phonebook) => {
      console.log(phonebook.name + " " + phonebook.number);
    });
    mongoose.connection.close();
  });
}
