# Sådan kan du tilføje nye sider

1. Opret et nyt view f.eks. hest.hbs
2. Lav en tilsvarende controlle i routes, f.eks. hest.js. 
3. Hvis der skal vises HTML, så brug res.render, og hvis du vil returnere JSON eller et billedfil, så brug res.send
4. I app.js skal du tilføje 2 steder:
----- var hestRouter = require('./routes/hest');
----- app.use('/heste', hestRouter); 