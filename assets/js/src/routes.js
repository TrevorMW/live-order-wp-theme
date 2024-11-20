const routes = {
    'merchant' : {
        'path' : '/merchant/:id',
        'name' : 'Merchant',
        'icon' : 'shopping-cart',
        'hide_in_nav' : true,
        'meta': {
            frontend: false,
            admin: true
        },
    },
    'dashboard' : {
        'path' : '/dashboard/:user_id/:merchant_post/:merchant_id/:location_post/:location_id/',
        'name' : 'Dashboard',
        'meta': {
            frontend: true,
            admin: false
        },
        'hide_in_nav' : true
    },
    'restaurant' :{
        'path' : '/restaurant/:id/',
        'name' : 'Restaurant',
        'hide_in_nav' : true,
        'meta': {
            frontend: false,
            admin: true
        },
    },
    'profile' : {
        'path' : '/profile/',
        'name' : 'Profile',
        'hide_in_nav' : true,
        'meta': {
            frontend: false,
            admin: true
        },
    },
    
}

export default routes;