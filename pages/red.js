import { useEffect } from 'react';
import { useRouter } from 'next/router';

function RedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return null;
}

export default RedirectPage;