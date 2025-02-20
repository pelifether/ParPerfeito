// Height distribution by age and gender for Brazilian population
export function calculateHeightPercentile(height, age, gender) {
    // Base statistics
    const maleAvg = 171.2;
    const femaleAvg = 158.8;
    const stdDev = 7;

    // Age affects height (people get shorter with age, peak at youth)
    const getAgeModifier = (age) => {
        if (age < 25) return 0;
        if (age < 35) return -0.2;
        if (age < 45) return -0.5;
        if (age < 55) return -1.0;
        if (age < 65) return -1.5;
        return -2.0;
    };

    // Get mean height based on gender and age
    const mean = gender === 'male' ? maleAvg : femaleAvg;
    const ageModifiedMean = mean + getAgeModifier(age);

    // Calculate z-score
    const zScore = (height - ageModifiedMean) / stdDev;

    // Convert to percentile using error function
    const percentile = 0.5 * (1 + erf(zScore / Math.sqrt(2)));

    return percentile;
}

// Error function approximation
function erf(x) {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

// Get height range for a given percentile
export function getHeightRangeForPercentile(percentile, gender) {
    const mean = gender === 'male' ? 171.2 : 158.8;
    const stdDev = 7;
    
    // Convert percentile to z-score
    const zScore = Math.sqrt(2) * erfInv(2 * percentile - 1);
    
    return mean + (zScore * stdDev);
}

// Inverse error function approximation
function erfInv(x) {
    const a = 0.147;
    const y = 2 * x - 1;
    const ln = Math.log(1 - y * y);
    
    let term1 = (2 / (Math.PI * a));
    let term2 = ln + Math.sqrt(ln * ln + (2 * a));
    
    return sign(y) * Math.sqrt(-term1 * term2);
}

function sign(x) {
    return x === 0 ? 0 : x > 0 ? 1 : -1;
} 