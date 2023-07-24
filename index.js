const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()

app.use(express.json())

const prof_users = []
const comp_users = []
const SECRET_KEY = "JOSH"

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
app.post('/comp/signup', (req, res)=>{
    const user_email = comp_users.find(p=>p.email===req.body.email)
    if(user_email){
        res.status(403).json({'message':'User already exists'})
    }
    else{
        const {firstname, lastname, email, password, country} = req.body;
        comp_users.push(req.body)
        console.log('email: '+req.body.email)
        const token = jwt.sign({email, role:'comp'}, SECRET_KEY, {expiresIn:'1h'})
        res.status(201).json({message:'User created successfully', token})
    }
})

// Professional routes
/** - POST /prof/signup
   Description: Creates a new professional account.
   Input: { firstname: 'Ayan', lastname:'Maiti', email: 'ayanmaiti@outlook.com', password: 'password', country: 'india' }
   Output: { message: 'Company created successfully' } 
*/
app.post('/prof/signup', (req, res)=>{
    const user_email = prof_users.find(p=>p.email===req.body.email)
    if(user_email){
        res.status(403).json({'message':'User already exists'})
    }
    else{
        const {firstname, lastname, email, password, country} = req.body;
        prof_users.push(req.body)
        const token = jwt.sign({email, role:'prof'}, SECRET_KEY, {expiresIn:'1h'})
        res.status(201).json({message:'User created successfully', token})
    }

})

/** - POST /prof/login
   Description: Login to professional account.
   Input: {email: 'ayanmaiti@outlook.com', password: 'password', country: 'india' }
   Output: { message: 'Company created successfully' } 
*/
app.post('/prof/view', authenticateJwt, (req, res)=>{
    res.sendStatus(201);
})
app.listen(3000, ()=>{console.log("listening on 3000")})