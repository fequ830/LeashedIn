const express = require('express');
const bodyParser = require('body-parser'); // Middleware to parse incoming requests before handlers

const app = express();
const port = process.env.PORT || 5000; //Set our port to be 5000 (localhost:5000)

const dataManager = require('./modules/data-manager.js')

app.use(bodyParser.json()); //Parses JSON and turns into JS accessible vars
app.use(bodyParser.urlencoded({ extended: true })); //Does same as line above but for URL encoded. extended=true means the data may not neccessarily be just a string.
const multer  = require('multer')

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "---" + file.originalname)
  }
})

const upload = multer({ storage: fileStorageEngine })
testDict = { //IGNORE just used to make sure client-server communication worked!
  "vchinn04" : {
    "money": 0,
    "status": "ye..."
  }
};

app.get('/api/hello', (req, res) => { //Get Event
  res.send({ express: 'Hello from Express' });
});

app.get('/api/ExperienceGetter', (req, res) => { //Get Event
  res.send({ express: 'heye from Express' });
});

app.get('/getUserArr', async (req, res) => { //Get Event
  console.log(req.query)
  const userListData = await dataManager.getUserList(req.query.searchEntry)

  res.send({ express: 'heye from Express', userList: JSON.stringify(userListData)  });
});

app.get('/getUserProfileText', async (req, res) => { //Get Event
  console.log(req.query)
  res.send({ aboutMe: "YEA SO\nthis dude said\nsomestuff\n😉", ownerName: "Victor Ch."})
});

app.get('/getUserProfilePic', async (req, res) => { //Get Event
  console.log(req.query)
  let imagePath = __dirname + "/images/1668842435241--Screen Shot 2022-10-12 at 10.11.00 PM.png"
  res.sendfile("/images/1668842435241--Screen Shot 2022-10-12 at 10.11.00 PM.png",{ root: __dirname });
});


app.post('/UserLogIn', async (req, res) => { //Get Event
  var inputDict = req.body;
  console.log("Log In request!")
  console.log(req.body)
  console.log(req.body.email)
  const userData = await dataManager.getUser(req.body.email)
  console.log(userData)
  userObj = userData[0];
  console.log(userObj)
  if (userObj == undefined){
    console.log("Bad email!")

    res.send({ loginStatus: false, errorMessage: 'Invalid email or password!' });
  }
  else if (userObj.password != req.body.password) {
    console.log("Bad passowrd!")
    res.send({ loginStatus: false, errorMessage: 'Invalid email or password!' });
  }
  else {
    console.log("Success!")
    res.send(JSON.stringify({ loginStatus: true, errorMessage: 'No Errors!' }));
  }
});

app.post('/PostTestEvent', (req, res) => {//Post Event, used to set data on server
  console.log(req.body);

  var inputDict = req.body;
  console.log(inputDict);

  var inputKey = inputDict.dataKey;
  console.log(inputKey);

  var inputValue = inputDict.dataValue;
  console.log(inputValue);

  dataManager.addUser(21, inputKey, inputValue);
  testDict[inputKey] = inputValue;
  res.send(
    JSON.stringify(testDict),
  );
});


app.post('/UpdateProfile', upload.single('image'), (req, res) => {
  console.log(req.file)
  console.log(req.body.userName)
  console.log(req.body.aboutState)
  res.send(JSON.stringify({ loginStatus: "ohh yea", errorMessage: 'No Errors!' }));

});

dataManager.setupMongo().catch(err => console.log(err)); //Initialize the DataBase in the data-manager modules
app.listen(port, () => console.log(`Server Up! Listening on port ${port}`)); //Binds server to localhost:5000
