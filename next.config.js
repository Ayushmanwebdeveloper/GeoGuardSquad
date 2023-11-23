module.exports = {
    generateEtags: false,
    headers: () => [
        {
            source: '/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                },
                {
                    key: 'Clear-Site-Data',
                    value: '*',
                }
            ],
        }
    ],
    webpack(config) {
        config.resolve.fallback = {

            // if you miss it, all the other options in fallback, specified
            // by next.js will be dropped.
            ...config.resolve.fallback,

            fs: false, // the solution
        };

        return config;
    },
}