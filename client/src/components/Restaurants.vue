<template>
    <div id="ProjetRestaurant">

    <div>
    <md-toolbar class="md-primary">
      <span class="md-title">Restaurants' Researcher</span>
    </md-toolbar>
    </div>
    <div>
        <md-card id="menu">
            <md-card-header>
                <div class="md-title">Menu</div>
                <md-divider></md-divider>
            </md-card-header>
            <md-card-content>
                <div>
                    <h4>Nombre de restaurants par page</h4>
                    <input @input="changeItemPerPage()" type="range" min=0 max=100 step="5" v-model="itemParPage">{{itemParPage}}
                    <md-progress-spinner :md-diameter="30" md-mode="determinate" :md-value="itemParPage"></md-progress-spinner>
                </div> 
                <md-divider></md-divider> 
                    <h4>Navigation</h4>
                    <md-button class="md-raised" v-on:click="pagePrec()">Page précédente</md-button>
                    <md-button class="md-raised" v-on:click="pageSuiv()">Page suivante</md-button> 
                <br>
                <br>
                <md-divider></md-divider>
                <h4>Ajout de restaurant</h4>
                <md-field>
                    <label>Nom :</label>
                    <md-input required v-model="name"></md-input>
                </md-field>
                <md-field>
                    <label>Cuisine :</label>
                    <md-input required v-model="cuisine"></md-input>
                </md-field>
                <md-field>
                    <label>Ville :</label>
                    <md-input required v-model="borough"></md-input>
                </md-field>
                <md-button class="md-raised md-primary" v-on:click="ajouterRestaurant">Ajouter ce restaurant</md-button>
            </md-card-content>
        </md-card>
        <md-card id="tableau">
            <div v-if="showEditMenu">
                <md-field>
                    <label>Nom :</label>
                    <md-input v-model="nameItemToEdit"></md-input>
                </md-field>
                <md-field>
                    <label>Cuisine :</label>
                    <md-input v-model="cuisineItemToEdit"></md-input>
                </md-field>
                <md-field>
                    <label>Ville :</label>
                    <md-input v-model="boroughItemToEdit"></md-input>
                </md-field>
                <md-button class="md-raised md-primary" v-on:click="modifierRestaurant">Valider</md-button>
                <md-button class="md-raised md-accent" v-on:click="annulerModifierRestaurant">Annuler</md-button>
                <md-divider></md-divider>
            </div>
            <md-table>
                <md-table-toolbar>
                    <div class="md-toolbar-section-start">
                    </div>
                    <md-field md-clearable class="md-toolbar-section-end">
                        <md-input placeholder="Search by name..." v-model="globalName" @input="chercherRestaurants" />
                    </md-field>
                </md-table-toolbar>
            
                <md-table-empty-state v-if="pasDeRestaurants" md-label="Aucuns restaurants trouvés" 
                    :md-description="`Nous sommes désolé mais nous n'avons trouvé aucun restaurants correspondant terme de recherche suivant : '${globalName}'.`">
                </md-table-empty-state>
            
                <md-table-row>
                    <md-table-head>Nom</md-table-head>
                    <md-table-head>Cuisine </md-table-head>
                    <md-table-head>Ville</md-table-head>
                </md-table-row>
                <md-table-row v-for="(restaurant,index) in restaurants" :key="index" v-bind:style="{backgroundColor:getColor(index)}"
                v-bind:class="{bordureRouge:(index === 2)}">
                    <!--<span>-->
                        <md-table-cell>{{restaurant.name}}</md-table-cell>
                        <md-table-cell> {{restaurant.cuisine}}</md-table-cell>
                        <md-table-cell> {{restaurant.borough}}</md-table-cell>
                        <md-table-cell><md-button class="md-raised" :to="'/RestaurantDetail/' + restaurant._id">Détails</md-button></md-table-cell>
                        <md-table-cell><md-button class="md-raised" v-on:click="selectionModifierRestaurant(restaurant._id, restaurant.name, restaurant.cuisine, restaurant.borough)">Modifier</md-button></md-table-cell>
                        <md-table-cell><md-button  class="md-raised md-accent" v-on:click="supprimerRestaurant(restaurant._id)">Supprimer</md-button></md-table-cell>
                        <!--<td> {{r._id}}</td>-->
                    <!--</span>-->
                </md-table-row>    
            </md-table>
        </md-card>
        <br>
    </div>
</div>
</template>
<script>
export default {
    name: 'ProjetRestaurant',
    data: () => ({
            search: null,
            searched: [],
            page: 1,
            itemParPage: 5,
            globalName: '',
            idItemToEdit: '',
            cuisineItemToEdit: '',
            nameItemToEdit: '',
            boroughItemToEdit: '',
            showEditMenu: false,
            pasDeRestaurants: false,
            /*showDetailPage: false,
            selectedRestaurant, */
            restaurants: [
                {
                    name: 'Café de Paris',
                    cuisine: 'Française',
                    borough: 'Moscou'
                },
                {
                    name: 'Sun City Café',
                    cuisine: 'Américaine',
                    borough: 'Marseille'
                }
            ],
            name: '',
            cuisine: '',
            borough: '',
            _id: '',
            //visible: true
        }),

        mounted() {
            console.log("AVANT RENDU HTML");
            this.getRestaurantsFromServer(true, true);
        },

        methods: {
            getRestaurantsFromServer(searcheByPage, applyItemPerPage) {
                this.pasDeRestaurants=false;
                //var itparpage = 10
                console.log("item par page : "+this.itemParPage)
                if (applyItemPerPage) {
                    if(this.itemParPage==0){
                        this.itemParPage = 1;
                    }
                }
                if (searcheByPage) {
                    // url (required), options (optional)
                    console.log("wtf is going on?")
                    fetch('http://localhost:8080/api/restaurants?page='+this.page+'&pagesize='+this.itemParPage)
                    .then((response) => {
                        console.log('test searchByPage')
                        return response.json();
                    })
                    .then((returnedValue) => {
                        this.restaurants = returnedValue.data;
                        console.log("searchByPage OK, page = "+this.page+"et item par page = "+this.itemParPage);
                    })
                    .catch((err) => {
                        // Error :(
                        console.log("Error: "+err);
                    });
                }
                else {
                    // url (required), options (optional)
                    fetch('http://localhost:8080/api/restaurants?pagesize='+this.itemParPage)
                    .then((response) => {
                        console.log('test1')
                        return response.json();
                    })
                    .then((returnedValue) => {
                        this.restaurants = returnedValue.data;
                        console.log("cc")
                    })
                    .catch((err) => {
                        // Error :(
                        console.log("Error: "+err);
                    });
                }
            },
            /*supprimerRestaurant(index) {
                this.restaurants.splice(index, 1);
            },*/
            supprimerRestaurant(id) {
                // url (required), options (optional)
                console.log("deleting restaurant : "+id+" ...");
                fetch('http://localhost:8080/api/restaurants/'+id, {
                    method: 'delete'
                })
                .then((response) => {
                    console.log("delete restaurant : "+id);
                    return response.json();
                })
                /*.then((returnedValue) => {
                    this.getRestaurantsFromServer(true, true);
                })*/
                .catch((err) => {
                    // Error :(
                    console.log("Error: "+err);
                });
            },
            /*ajouterRestaurant(event) {
                // eviter le comportement par defaut
                event.preventDefault();

                console.log("ajout d\'un restaurant...")
                this.restaurants.push(
                    {
                        name: this.name,
                        cuisine: this.cuisine/*,
                        _id: this._id
                    }
                );
                this.name = "";
                this.cuisine = "";
                this.borough = "";
                this._id = "";
                //this.visible = true;
            },*/
            ajouterRestaurant(/*restaurant*/) {
                // url (required), options (optional)
                let formData = new FormData();
                formData.append('name', this.name)
                formData.append('cuisine', this.cuisine)
                formData.append('borought', this.borough)

                console.log("adding restaurant : "+this.name+" ...");
                fetch('http://localhost:8080/api/restaurants/', {
                    body: formData,
                    method: 'post'
                })
                .then((response) => {
                    console.log("add restaurant : "+this.name);
                    return response.json();
                })
                .catch((err) => {
                    // Error :(
                    console.log("Error: "+err);
                });
                this.name = "";
                this.cuisine = "";
                this.borough = "";
                this._id = "";
            },
            detailsRestaurant(r){
                console.log("restaurant selected: "+r._id);
            },
            selectionModifierRestaurant(id, name, cuisi, borou){
                this.idItemToEdit = id;
                this.nameItemToEdit = name;
                this.cuisineItemToEdit = cuisi;
                this.boroughItemToEdit = borou;
                console.log("restaurant selected for edition: "+this.nameItemToEdit+" id: "+this.idItemToEdit);
                this.showEditMenu = true;
            },
            modifierRestaurant(){
                // url (required), options (optional)
                let formData = new FormData();
                formData.append('name', this.nameItemToEdit);
                formData.append('cuisine', this.cuisineItemToEdit);
                formData.append('borough', this.boroughItemToEdit);
                fetch('http://localhost:8080/api/restaurants/'+this.idItemToEdit, {
                    body: formData,
                    method: 'put'
                })
                .then((response) => {
                    console.log("restaurant: "+ this.idItemToEdit+ " updated!")
                    return response.json();
                })
                .catch((err) => {
                    // Error :(
                    console.log("Error: "+err);
                });
                this.idItemToEdit = "";
                this.nameItemToEdit = "";
                this.cuisineItemToEdit = "";
                this.boroughItemToEdit = "";
                this.showEditMenu = false;
            },
            annulerModifierRestaurant(){
                this.idItemToEdit = "";
                this.nameItemToEdit = "";
                this.cuisineItemToEdit = "";
                this.boroughItemToEdit = "";
                this.showEditMenu = false;
            },
            getRestaurantsByNameFromServeur() {
                let url = "http://localhost:8080/api/restaurants?";
                url += "page=" + this.page;
                url += "&pagesize=" + this.itemParPage;
                url += "&name=" + this.globalName;
      
              fetch(url)
                .then((responseJSON) => {
                  // arrow functions, conserve le bon "this"
                  // la réponse est en JSON, on la convertit avec la ligne suivante
                  responseJSON.json().then((resJS) => {
                    // Maintenant resJS est un vrai objet JavaScript
                    this.restaurants = resJS.data;
                    console.log("Restaurants: "+this.restaurants);
                    if(""+this.restaurants == ''){
                        console.log("Pas de restaurants trouvés");
                        this.pasDeRestaurants=true;
                    } else {
                        console.log("Tout va bien vous avez trouvé des restaurants")
                        this.pasDeRestaurants=false;
                    }
                    this.nbRestaurantsTotal = resJS.count;
                    this.nbPagesTotal = Math.round(
                      this.nbRestaurantsTotal / this.itemParPage
                    );
                  });
                })
                .catch(function (err) {
                  console.log(err);
                });
            },
            chercherRestaurants/*: _.debounce(function */() {
              // appelée que si on n'a pas tapé de touches pendant un certain délai
                event.preventDefault();
                console.log("updatefiler: "+this.globalName);
                this.globalName = event.target.value;
                if(this.globalName!=undefined){
                    this.pasDeRestaurants=false;
                    this.getRestaurantsByNameFromServeur();
                }
                else {
                    this.getRestaurantsFromServer();
                }
            },/* 300),*/
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            },
            pagePrec() {
                if(this.page!=1) {
                    this.page--
                    console.log("prec p"+ this.page)
                    this.getRestaurantsFromServer(true, true);
                }
            },
            pageSuiv() {
                this.page++
                console.log("suiv p"+ this.page)
                this.getRestaurantsFromServer(true, true);
            },
            changeItemPerPage() {
                //console.log("value from slider : "+this.value)
                //itemParPage = this.value;
                console.log("slide ok itemParPage="+this.itemParPage)
                this.getRestaurantsFromServer(true, true);
            },
            updateFilter(/*event*/) {
            }
            /*,
            rechercherRestaurant(event) {
                event.preventDefault();

                console.log("terme de recherche : "+termeDeRecherche)
                this.restaurants.forEach(restaurant => {
                    console.log(restaurant.name)
                    var restoString = ""+restaurant.name+"";
                    console.log(restoString.includes(""+termeDeRecherche+""))
                    if (!restoString.includes(""+termeDeRecherche+"")) {
                        console.log("on n'affiche pas "+restoString+" !")
                        restaurant.visible=false
                    }
                });
            },
            restaurantVisibleOrNot(restaurant) {
                console.log(restaurant.visible)
                return restaurant.visible == true;
            }*/
        }
}
</script>

<style scoped>
    div {
        margin-bottom: 20px;
    }
    .md-button {
        font-size: 0.9em;
    }
    #menu {
    margin-left: 1%;
    width: auto;
    padding: 1%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    }
    #tableau { 
    width: auto;
    padding: 1%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    }
</style>

