const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

async function busRegister(name, email, phone, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newBus = await db.query("insert into businesses (name, email, phone, password) values ($1, $2, $3, $4) returning id, name, email, phone", [name, email, phone, hashedPassword]);
        const newBusData = newBus.rows[0];
        if(!newBusData){
            return false;
        }
        return newBusData;
}

async function busLogin(email, password) {
    const business = await db.query("select id, email, password from businesses where email = $1",[email]);
    if(!business){
        return false;
    }
    const businessdata = business.rows[0];
    if(!businessdata){
        return false;
    }
    const isCorrectPassword = await bcrypt.compare(password, businessdata.password);
    let correctPass = false;
    if(isCorrectPassword){
        correctPass = true
    }
    if(correctPass){
        const access_token = await jwt.sign({id: businessdata.id}, process.env.JWT_SECRET, {expiresIn: "15m"});
        const refresh_token = await jwt.sign({id: businessdata.id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        const addtokens = await db.query("update businesses set access_token = $1, refresh_token = $2 where id = $3 returning id, name, email, phone, access_token, refresh_token",[access_token, refresh_token, businessdata.id]);
        const busdata = addtokens.rows[0];
        return  busdata;
    }
    return false;
}

async function busLogout(access_token) {
    const business = await db.query("select id, access_token from businesses where access_token = $1",[access_token]);
    const businessData = business.rows[0];
    if(!businessData){
        return false;
    }
    const verifyAccessToken = await jwt.verify(access_token, process.env.JWT_SECRET);
    if(verifyAccessToken){
        const LogOut = await db.query("update businesses set access_token = null, refresh_token = null where access_token = $1",[access_token]);
        return true;
    }
    return false
}

async function busRefresh(refresh_token) {
    const business = await db.query("select id, access_token, refresh_token from businesses where refresh_token = $1",[refresh_token]);
    const businessData = business.rows[0];
    if(!businessData){
        return false;
    }
    const new_access_token =  await jwt.sign({id: businessData.id}, process.env.JWT_SECRET, {expiresIn: "15m"});
    const new_refresh_token = await jwt.sign({id: businessData.id}, process.env.JWT_SECRET, {expiresIn: "7d"});

    const addtokens = await db.query("update businesses set access_token = $1, refresh_token = $2 where id = $3 returning access_token, refresh_token",[new_access_token, new_refresh_token, businessData.id]);
    const busData = addtokens.rows[0];
    return busData;
}

module.exports = {busRegister, busLogin, busLogout, busRefresh}