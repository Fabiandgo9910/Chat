module.exports = {
    port : process.env.port || 3001 ,
    db :  process.env.Mongodb || "mongodb://localhost/bd",
     SECRET_TOKEN:'miclavedetoken'
}