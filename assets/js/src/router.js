import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const generateRoutes = function(data){
    let routeData = [];

    Object.keys(data).forEach(id => {
        const obj = data[id];
        const component = () => import('../../vue/views/' + obj.name + '.vue');

        routeData.push({
            ...obj,
            component: component
        })
    })

    return routeData;
}

export default createRouter({
    history: createWebHistory(),
    routes: generateRoutes(routes)
});
