const config = require('./config/exports')
const Database = config.DATABASE;
const port = config.PORT;
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileUpload = require('express-fileupload');

const Users = require('./routes/api/users');
const Posts = require('./routes/api/posts');
const Profile = require('./routes/api/profile');


// mongoose connection
mongoose.connect(Database);
mongoose.connection.once('open', (err)=>{
  if(err)throw err;
  console.log('mongo with us');
});
mongoose.connection.on('err',  (err,res)=>{
  if(err)throw err;})



app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileUpload())


require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());



app.use('/api/users', Users);
app.use('/api/posts', Posts);
app.use('/api/profile', Profile);


app.listen(port, ()=> console.log(`we run on ${port}`))