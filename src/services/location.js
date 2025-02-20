export async function getUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/', {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Fallback to São Paulo if we can't get the city
        if (!data.city) {
            return {
                city: 'São Paulo',
                state: 'SP',
                population: 12325232
            };
        }
        
        return {
            city: data.city,
            state: data.region_code,
            population: getCityPopulation(data.city)
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        // Fallback to São Paulo on error
        return {
            city: 'São Paulo',
            state: 'SP',
            population: 12325232
        };
    }
}

function getCityPopulation(city) {
    const populations = {
        'São Paulo': 12325232,
        'Rio de Janeiro': 6747815,
        'Brasília': 3055149,
        'Salvador': 2886698,
        'Fortaleza': 2686612,
        'Belo Horizonte': 2521564,
        'Manaus': 2219580,
        'Curitiba': 1948626,
        'Recife': 1653461,
        'Porto Alegre': 1484941
    };
    return populations[city] || 2000000; // Default to 2 million if city not found
}