var MongoClient = require('mongodb').MongoClient;
const {ObjectId} =require('mongodb');
var url = "mongodb://localhost:27017/music";
var databasename="music";
var filename="user";


const registerModel=async(postData)=>{
    var bl=false;
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query=await user.insertOne({ 
        "username": postData.username,
        "password":postData.password,
        "email":postData.email
    });
    if(query.result.ok==1){
        bl=true;
    }
    return bl;
}


const loginModel=async(postData)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.find({"email":postData.email}).toArray();
    return query;
}


const findUsername=async(username)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.find({username:username}).toArray();
    return query;
}

const findEmailModel=async(email)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.find({email:email}).toArray();
    return query;
}



const updateModel=async(postData)=>{
    var bl=false;
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var whereStr = {_id:ObjectId(postData._id)};  // 查询条件
    delete postData._id;
    var updateStr = {$set: { "username": postData.username,"password":postData.password,"email":postData.email}};   //修改内容
    var arr=await user.updateOne(whereStr,updateStr);
    console.log(arr.result.ok);
    if(arr.result.ok==1){
        bl=true;
    }
    return bl;
}

module.exports={
    registerModel,
    loginModel,
    findUsername,
    updateModel,
    findEmailModel,
}
