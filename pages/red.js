import { useEffect } from 'react';

function RedirectPage() {

    useEffect(() => {
        window.location.href = '/red';
    }, []);

    return null;
}

export default RedirectPage;