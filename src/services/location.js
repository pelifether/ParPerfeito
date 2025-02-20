export async function getUserLocation() {
    try {
        console.log('Fetching location from ipapi...');
        // Using the JSONP endpoint which supports CORS
        const response = await fetch('https://ipapi.co/json/?callback=?', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors' // Explicitly set CORS mode
        });
        
        if (!response.ok) {
            console.log('API response not ok, using fallback');
            return getFallbackLocation();
        }
        
        let data = await response.text();
        // Remove the JSONP callback wrapper
        data = JSON.parse(data.replace(/^[^{]+{/, '{').replace(/}[^}]+$/, '}'));
        console.log('Raw API response:', data);
        
        if (!data.city) {
            console.log('No city in response, using fallback');
            return getFallbackLocation();
        }
        
        const location = {
            city: data.city,
            state: data.region_code,
            population: getCityPopulation(data.city)
        };
        
        console.log('Returning location:', location);
        return location;
    } catch (error) {
        console.error('Error fetching location:', error);
        return getFallbackLocation();
    }
}

function getFallbackLocation() {
    return {
        city: 'São Paulo',
        state: 'SP',
        population: 12325232
    };
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