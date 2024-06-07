const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response('Home Page');
        }
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return h.response('Halaman tidak dapat diakses dengan method tersebut');
        }

    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return h.response('About Page');
        }
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },

    // Path parameter technique
    {
        method: 'GET',
        path: '/hello/{name}',
        handler: (request, h) => {
            //  using request parameter
            const { name = "stranger " } = request.params
            // using query parameter
            const { lang } = request.query

            if (lang === 'id') {
                return `Hai, ${name}`
            }
            return h.response(`Hello ${name}`);
        }
    },

    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];

module.exports = routes;