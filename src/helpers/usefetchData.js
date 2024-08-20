import { useState, useEffect } from 'react';

export function useFetchData(apiUrl, localStorageKey) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = localStorage.getItem(localStorageKey);
                if (cachedData) {
                    setData(JSON.parse(cachedData));
                } else {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    localStorage.setItem(localStorageKey, JSON.stringify(result));
                    setData(result);
                }
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        fetchData();
    }, [apiUrl, localStorageKey]);

    return { data, error };
}
