import { useEffect } from 'react';

function RedirectPage() {

    useEffect(() => {
        window.location.href = '/';
    }, []);

    return null;
}

export default RedirectPage;