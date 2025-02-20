import React from 'react';

const StructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Calculadora de Par Ideal",
        "description": "Calcule suas chances de encontrar o par ideal no Brasil com base em dados demográficos reais.",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };

    return (
        <script type="application/ld+json">
            {JSON.stringify(structuredData)}
        </script>
    );
};

export default StructuredData; 