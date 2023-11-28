const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

const secretKey = 'spotify';
app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [
                                                                            { url: '/user', methods: ['POST','GET','PUT'] },
                                                                            { url:'/user/logout',methods:['POST'] },
                                                                            { url:'/login',methods:['POST'] },
                                                                            { url:'/register',methods:['POST'] },
                                                                            { url:'/search',methods:['GET'] },
                                                                            { url:'/',methods:['GET'] },
                                                                    ] }));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        status: 401,
        message: 'Invalid token'
      })
    }
    res.status(500).json({
      status: 500,
      message: 'The token has expired. Please log in again'
    })
});



const userController=require(process.cwd()+'/controller/user');
const searchController=require(process.cwd()+'/controller/search');
const musicController=require(process.cwd()+'/controller/music');

app.get('/',function(){

});
app.get('/me',userController.selectToken);
app.put('/user',userController.update);
app.post('/login',userController.login);
app.post('/register',userController.register);
app.post('/user/logout',userController.logout);
app.get('/search',searchController.getSearch);
app.get('/music',musicController.findUidMusic);
app.delete('/music',musicController.deleteMusic);
app.post('/music',musicController.addMusic);



app.listen(3007, function () {
    console.log("http://localhost:3007/");
})