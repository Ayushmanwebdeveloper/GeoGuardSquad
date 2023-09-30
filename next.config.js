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
        },
        {
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