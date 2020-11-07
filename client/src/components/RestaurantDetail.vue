<template>
    <div id="app">
        <div>
        <md-toolbar class="md-primary">
        <span class="md-title">Détail du restaurant {{restaurant.name}}</span>
        </md-toolbar>
        </div>
        <md-card id="zoneDAffichage">
            <h2>A propos</h2>
            <p>Le restaurant {{restaurant.name}} situé à {{restaurant.address.street}} dans {{restaurant.borough}}, vous propose une cuisine {{restaurant.cuisine}}.</p>
            <img src="https://www.apicius-shop.com/media/common/categories/marmitte_1.jpg">
        </md-card>
        <md-card id="zoneDAffichage">
            <h2>Où sommes-nous ?</h2>
            <gmap-map :center="{lat: restaurant.address.coord[1], lng: restaurant.address.coord[0]}" :zoom="12" style="width:30%;height:400px;">
                <gmap-marker :position="{lat: restaurant.address.coord[1], lng: restaurant.address.coord[0]}"></gmap-marker>
            </gmap-map>
        </md-card>
    </div>
</template>

<script>
export default {
    name: 'RestaurantDetail',
    props: {
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    data: function() {
        return {
            restaurant: null
        }
    },
    mounted() {
        console.log("id : " + this.id);
        let url = "http://localhost:8080/api/restaurants/" + this.id;
        fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data.restaurant.name);
            this.restaurant = data.restaurant;
        })
    }
}
</script>

<style scoped>
    div {
        margin-bottom: 20px;
    }
    #zoneDAffichage {
        padding: 1%;
    }
</style>