# Med Sproget På Arbejde

## Hvem, hvad og hvorfor?
Dette repository indeholder det udviklingsmæssige arbejde hen imod en færdigkørende applikation, bestilt af Center for Dansk og Integration. Ønsket fra CDI kan kortfattet formuleres som: en web-app, der skal gøre det lettere for indvandrere at lære det danske sprog på arbejdspladsen.

Software-produktet er en fusion af et samarbejde mellem multimediedesignstuderende fra EASJ Køge, som har stået for en del af frontend-udviklingen og datamatikerstuderende fra EASJ Næstved, som har stået for backend-udvikling etc.

De officielle Product Owners er Kirsten og Susanne fra CDI, og web-app'en udgør en del af datamatikereksamen på tredje semester i Systemudvikling.

I projektets Wiki-sektion præsenteres elementer fra systemudviklingsprocessen i form af eksempelvis Scrum-Board og Product Backlog.

![alt text](https://i.imgur.com/ELuikko.png)

**Collaborators:**
Mathias Blomgaard, Thomas Christensen, Sebastian Ougter, Michael Trans, Daniel Lyck.




Body-parser:
    For at kunne læse HTTP POST data skal vi bruge node modulet "body-parser". body-parser er et stykke express middleware, der læser input og gemmer det som et javascript objekt tilgængeligt via req.body

express:
    Søger for at applikation kan kører.
nodemon:
    Bruges til at hver gang du ændre noget kode og du så gemmer det så genstarter server automatiskt.

mongoose:
    Objekt data modellering for at forenkle interaktioner med MongoDB.
bcrypt:
    Bruges til hashing og salting af passwords. 

express session:
    Session date er ikke gemt i cookie kun dens session id. Session data er gemt på server-siden.
connect-mongo
    Søger for at vi kan gemme vores sessions i vores MongoDB database. 