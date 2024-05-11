require ('dotenv').config();

const config ={
    port: process.env.PORT || 3001,
    url: process.env.URL,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS,
    db_name: process.env.DB_NAME,
    secret_key: process.env.SECRET_KEY

}
        
module.exports ={
    config
}