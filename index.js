const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

const mongodb_URI = "mongodb+srv://upwork:upwork@cluster0.fsn5iln.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongodb_URI)
.then(()=>{
    console.log("connected to mongodb.")
})

const prof_users = []
const comp_users = []
const SECRET_KEY = "JOSH"

const userSchema = new mongoose.Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type: String, required:true},
        email: {type: String, required:true},
        password: {type: String, required:true},
        country: {type: String, required:true},
    }
)

const prof_user_db = mongoose.model('ProfUsers', userSchema)
const comp_user_db = mongoose.model('CompUsers', userSchema)

const authenticateJwt = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, SECRET_KEY, (err, email)=>{
            if(err){
                res.sendStatus(401)
            }
            console.log("verify returns: "+email[0]+" "+email[1].role)
            req.email = email;
            next()
        })
    }
    else{
        res.sendStatus(401)
    }
}

// Company routes
/** - POST /comp/signup
   Description: Creates a new company account.
   Input: { firstname: 'Ayan', lastname:'Maiti', email: 'ayanmaiti@outlook.com', password: 'password', country: 'india' }
   Output: { message: 'Company created successfully' } 
*/
app.post('/comp/signup', async (req, res)=>{
    const user_email = await comp_user_db.findOne({email:req.body.email});//comp_users.find(p=>p.email===req.body.email)
    if(user_email){
        res.status(403).json({'message':'User already exists'})
    }
    else{
        const new_comp = new comp_user_db(req.body)
        new_comp.save()
        const token = jwt.sign({email: req.body.email, role:'comp'}, SECRET_KEY, {expiresIn:'1h'})
        res.status(201).json({message:'User created successfully', token})
    }
})

// Professional routes
/** - POST /prof/signup
   Description: Creates a new professional account.
   Input: { firstname: 'Ayan', lastname:'Maiti', email: 'ayanmaiti@outlook.com', password: 'password', country: 'india' }
   Output: { message: 'Company created successfully' } 
*/
app.post('/prof/signup', async (req, res)=>{
    const user_email = await prof_user_db.findOne({email: req.body.email})
    if(user_email){
        res.status(403).json({'message':'User already exists'})
    }
    else{
        const new_prof = new prof_user_db(req.body)
        new_prof.save()
        const token = jwt.sign({email: req.body.email, role:'prof'}, SECRET_KEY, {expiresIn:'1h'})
        res.status(201).json({message:'User created successfully', token})
    }

})

/** - POST /comp/login
   Description: Login to company account.
   Input: {email: 'ayanmaiti@outlook.com', password: 'password'}
   Output: { message: 'Logged in successfully' } 
*/

app.post('/comp/login', async(req, res)=>{
    const {email, password} = req.headers
    const user = await comp_user_db.findOne({email, password})
    if(user){
        const token = jwt.sign({email, role:'company'}, SECRET_KEY, {expiresIn: '1h'})
        return res.status(200).json({message:'Logged in successfully', token})
    }
    res.sendStatus(403)
})
/** - POST /prof/login
   Description: Login to professional account.
   Input: {email: 'ayanmaiti@outlook.com', password: 'password'}
   Output: { message: 'Logged in successfully' } 
*/
app.post('/prof/login', async(req, res)=>{
    const {email, password} = req.headers
    const user = await prof_user_db.findOne({email, password})
    if(user){
        const token = jwt.sign({email, role:'prof'}, SECRET_KEY, {expiresIn:'1h'})
        return res.status(200).json({message:'Logged in successfully', token})
    }
    res.sendStatus(403)
})

app.post('/prof/view', authenticateJwt, (req, res)=>{
    res.sendStatus(201);
})
app.listen(3000, ()=>{console.log("listening on 3000")})