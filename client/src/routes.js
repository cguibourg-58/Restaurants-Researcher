import Restaurants from './components/Restaurants.vue'
import RestaurantDetail from './components/RestaurantDetail.vue'

const routes = [
    { 
        path: '/',
        component: Restaurants },
    {
        path: '/RestaurantDetail/:id',
        component: RestaurantDetail,
        props: {
            msg: "affichage des details d'un restaurant"
        }
    }
  ];
  
  export default routes;