var page = 1;
var itemParPage = 5;
var termeDeRecherche = '';
window.onload=init;

function init() {
    new Vue({
        el: "#app",
        data: {
            globalName: '',
            idItemToEdit: '',
            cuisineItemToEdit: '',
            nameItemToEdit: '',
            boroughItemToEdit: '',
            showEditMenu: false,
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
        },

        mounted() {
            console.log("AVANT RENDU HTML");
            this.getRestaurantsFromServer(true, true);
        },

        methods: {
            getRestaurantsFromServer(searcheByPage, applyItemPerPage) {
                var itparpage = 10
                if (applyItemPerPage) {
                    if(itemParPage==0){
                        itemParPage = 1;
                    }
                    itparpage = itemParPage;
                    console.log("item par page : "+itparpage)
                }
                if (searcheByPage) {
                    // url (required), options (optional)
                    fetch('http://localhost:8080/api/restaurants?page='+page+'&pagesize='+itparpage)
                    .then((response) => {
                        console.log('test searchByPage')
                        return response.json();
                    })
                    .then((returnedValue) => {
                        this.restaurants = returnedValue.data;
                        console.log("searchByPage OK, page = "+page+"et item par page = "+itparpage)
                    })
                    .catch((err) => {
                        // Error :(
                    });
                }
                else {
                    // url (required), options (optional)
                    fetch('http://localhost:8080/api/restaurants')
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
                .then((returnedValue) => {
                    this.getRestaurantsFromServer(true, true);
                })
                .catch((err) => {
                    // Error :(
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
            ajouterRestaurant(restaurant) {
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
                });
                this.name = "";
                this.cuisine = "";
                this.borough = "";
                this._id = "";
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
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            },
            pagePrec() {
                if(page!=1) {
                    page--
                    console.log("prec p"+ page)
                    this.getRestaurantsFromServer(true, true);
                }
            },
            pageSuiv() {
                page++
                console.log("suiv p"+ page)
                this.getRestaurantsFromServer(true, true);
            },
            sliderClick() {
                //console.log("value from slider : "+this.value)
                //itemParPage = this.value;
                console.log("slide ok itemParPage="+itemParPage)
                this.getRestaurantsFromServer(true, true);
            },
            updateFilter(event) {
                event.preventDefault();
                console.log("updatefiler: "+this.globalName);
                this.globalName = event.target.value;
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
    })
}