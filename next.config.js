module.exports = {
    headers: () => [
        {
            generateEtags: false,
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
        },
        {
            generateEtags: false,
            source: '*',
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
        },
    ],
}