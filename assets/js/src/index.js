import { createPinia } from 'pinia'

import HomeApp from '../../vue/apps/home';
import router from './router';

const pinia = createPinia();

document.addEventListener("DOMContentLoaded", function(event) { 
    const mainApp = document.getElementById('mainApp');
    
    if(mainApp){
        new HomeApp(mainApp, pinia, router);
    }
});
