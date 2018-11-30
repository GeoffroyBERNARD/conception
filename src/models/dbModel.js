module.exports = function(mongoose, app){
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {


        
    
        commentaireSchema = new mongoose.Schema({
            titre: String,
            Description : String,
        })
        pointInteretSchema = new mongoose.Schema({
            titre: String,
            type: String,
            Description : String,
            xmin : Number,
            ymin : Number,
            xmax : Number,
            ymax : Number,
            refSpaciale : String,
            type : String, 
            siteWeb : String,
            numero: String,
            adresse: String,
            Parents : [{ type : mongoose.Schema.Types.ObjectId, ref: 'PointInteret' }],
            Enfants : [{ type : mongoose.Schema.Types.ObjectId, ref: 'PointInteret' }],
            Evenements : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Evenement' }],
            Commentaires : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Commentaire' }]
        })

        utilisateurSchema = new mongoose.Schema({
            nom : String,
            prenom : String,
            motDePasse : String
        })

        evenementSchema = new mongoose.Schema({
            titre : String,
            date : Date,
            SousEvenements : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Evenement' }]
        })
    
        let Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);
        let Commentaire = mongoose.model('Commentaire', commentaireSchema);
        let PointInteret = mongoose.model('PointInteret', pointInteretSchema);
        let Evenement = mongoose.model('Evenement', evenementSchema);

        require('../routes/routes')(app, Utilisateur, Commentaire, PointInteret, Evenement);
    });
}
