import { DEMOGRAPHICS } from '../data/demographics';

const getAgeGroupPercentage = (minAge, maxAge) => {
    let percentage = 0;
    const ageGroups = Object.entries(DEMOGRAPHICS.age_groups);
    
    for (const [range, value] of ageGroups) {
        const [start, end] = range.split('-').map(n => parseInt(n) || 100);
        
        // Skip if the entire range is outside our min-max
        if (end < minAge || start > maxAge) continue;
        
        if (start >= minAge && (end <= maxAge || range === '70+')) {
            // If the entire range is within our min-max, add full value
            percentage += value;
        } else {
            // For partial overlaps, calculate the proportion
            const rangeSize = range === '70+' ? 30 : end - start + 1; // Assume 70+ spans 30 years
            let overlapStart = Math.max(start, minAge);
            let overlapEnd = range === '70+' ? Math.min(100, maxAge) : Math.min(end, maxAge);
            let overlapSize = overlapEnd - overlapStart + 1;
            
            percentage += (value * overlapSize) / rangeSize;
        }
    }
    
    return percentage;
};

export function calculateMatches(filters) {
    let matchPercentage = 100;
    const total = DEMOGRAPHICS.total_population;
    
    // Apply age filter with precise calculations
    const agePercentage = getAgeGroupPercentage(filters.age[0], filters.age[1]);
    matchPercentage *= agePercentage;
    
    // Apply gender filter
    if (filters.genders.length > 0) {
        const genderSum = filters.genders.reduce((sum, gender) => 
            sum + DEMOGRAPHICS.gender[gender], 0);
        matchPercentage *= genderSum;
    }
    
    // Apply race filter
    if (filters.races.length > 0) {
        const raceSum = filters.races.reduce((sum, race) => 
            sum + DEMOGRAPHICS.race[race], 0);
        matchPercentage *= raceSum;
    }
    
    // Apply income filter
    const incomeRanges = Object.entries(DEMOGRAPHICS.income_percentiles)
        .sort(([a], [b]) => parseInt(a) - parseInt(b));
    
    for (const [income, percentage] of incomeRanges) {
        if (parseInt(income) >= filters.minIncome) {
            matchPercentage *= percentage;
            break;
        }
    }
    
    // Apply exclusions
    if (filters.excludeMarried) {
        matchPercentage *= DEMOGRAPHICS.marital.single;
    }
    
    if (filters.excludeUnemployed) {
        matchPercentage *= DEMOGRAPHICS.employment.employed;
    }
    
    // Apply zodiac exclusions (1/12 for each sign)
    if (filters.excludeZodiacSigns.length > 0) {
        matchPercentage *= (12 - filters.excludeZodiacSigns.length) / 12;
    }
    
    const matchCount = Math.round(total * (matchPercentage / 100));
    
    return {
        matchCount,
        totalCount: total,
        percentage: matchPercentage
    };
} 