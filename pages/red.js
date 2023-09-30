import { useEffect } from 'react';

function RedirectPage() {

    useEffect(() => {
        window.location.href = '/map';
    }, []);

    return null;
}

export default RedirectPage;