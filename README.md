# Projet "Restaurant's Researcher"

Réalisé par Clément Guibourg dans le cadre d'un devoir d'étude


## Comment lancer l'application

1/ Ouvrir un terminal et lancer la commande suivante : mongod

2/ Aller dans le répertoire serveurNodeMongoRESTful et lancer la commande suivante : node .\serverCrudWithMongo.js

3/ Aller dans le répertoire client et lancer la commande suivante : npm i

4/ Aller dans le répertoire client et lancer la commande suivante : npm run serve


## A propos de l'application

Cette application permet de gérer une liste de restaurants récupérée via une API.
Les restaurants peuvent être édités, supprimés, créés/ajoutés et visualisés en détail.
On peut se déplacer de page en page, ainsi que régler le nombre d'items (restaurants) par page, de 1 à 100 avec un pas de 10.
Pour visualiser les détails d'un restaurant, l'application nous renvoie sur une page spéciale, où l'ont peu voir de nombreux détails, tel que la rue où se trouve le restaurant et sa position sur Google Map.
Cette application a été réalisée en javascript avec VueJS.


## Points remarquables

- Sur la page principale, les différentes zones sont rangées dans des balises md-card :
    - Une pour le menu à gauche
    - Une autre pour l'affichage de la liste des restaurants à droite.
    /!\ Suivant la taille de l'écran la md-card qui gère l'affichage de la liste est affiché en dessous. 
    A propos md-card est fourni par la librairie VueMaterial.

- Pour afficher les données détaillées, nous passons par un routeur (routes.js), qui prend en paramètre l'identifiant du restaurant, et qui envoie sur une vue RestaurantDetail qui fait un nouvel appel vers l'API pour avoir les données détaillées du restaurant en passant l'identifiant en paramètre de l'appel.

- La map (Google Map) est gérée avec vue-google-maps, avec les fonctionnalités suivantes :
    - la balise gmap-map qui permet d'afficher la map et de centrer la map sur une position donnée.
    - la balise gmap-marker qui permet d'ajouter des repères sur la map.

Dans cette application cette map affiche un repairs qui correspond à la position géographique du restaurant.

- Lorsqu'on régle le nombre de restaurant par page, un "md-model-spiner" change d'affichage en fonction du nombre de restaurant par page sélectionné.
