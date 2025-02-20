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
    // Population data from IBGE 2021 estimates
    const populations = {
        // Top 10
        'São Paulo': 12325232,
        'Rio de Janeiro': 6747815,
        'Brasília': 3055149,
        'Salvador': 2886698,
        'Fortaleza': 2686612,
        'Belo Horizonte': 2521564,
        'Manaus': 2219580,
        'Curitiba': 1948626,
        'Recife': 1653461,
        'Porto Alegre': 1484941,
        
        // 11-30
        'Belém': 1499641,
        'Goiânia': 1536097,
        'Guarulhos': 1404694,
        'Campinas': 1213792,
        'São Luís': 1108975,
        'São Gonçalo': 1091737,
        'Maceió': 1025360,
        'Duque de Caxias': 924624,
        'Campo Grande': 916001,
        'Natal': 890480,
        'Teresina': 871126,
        'São Bernardo do Campo': 844483,
        'Nova Iguaçu': 823302,
        'João Pessoa': 817511,
        'Santo André': 723889,
        'São José dos Campos': 721944,
        'Osasco': 699944,
        'Jaboatão dos Guararapes': 706867,
        'Ribeirão Preto': 711825,
        'Uberlândia': 699097
    };
    
    return populations[city] || 100000; // Default to 100,000 if city not found
}