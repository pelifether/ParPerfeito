import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export async function initDB() {
    if (!db) {
        db = await open({
            filename: './demographics.db',
            driver: sqlite3.Database
        });
    }
    return db;
}

export async function calculateMatches(filters) {
    const db = await initDB();
    
    // Get base population
    const total = await db.get('SELECT value FROM demographics WHERE category = "total_population"');
    let matchPercentage = 100;
    
    // Apply each filter using multiplication method
    if (filters.genders.length > 0) {
        const genderQuery = 'SELECT SUM(value) as sum FROM demographics WHERE category = "gender" AND subcategory IN (?)';
        const { sum } = await db.get(genderQuery, [filters.genders.join(',')]);
        matchPercentage *= sum;
    }
    
    // Apply age filter
    const ageQuery = 'SELECT SUM(value) as sum FROM demographics WHERE category = "age_groups" AND subcategory BETWEEN ? AND ?';
    const { sum: ageSum } = await db.get(ageQuery, [filters.age[0], filters.age[1]]);
    matchPercentage *= ageSum;
    
    // Apply income filter
    if (filters.minIncome > 1000) {
        const incomeQuery = 'SELECT value FROM demographics WHERE category = "income_percentiles" AND subcategory >= ?';
        const { value: incomePerc } = await db.get(incomeQuery, [filters.minIncome]);
        matchPercentage *= incomePerc;
    }
    
    // Apply race filter
    if (filters.races.length > 0) {
        const raceQuery = 'SELECT SUM(value) as sum FROM demographics WHERE category = "race" AND subcategory IN (?)';
        const { sum: raceSum } = await db.get(raceQuery, [filters.races.join(',')]);
        matchPercentage *= raceSum;
    }
    
    // Apply exclusions
    if (filters.excludeMarried) {
        const { value: singlePerc } = await db.get('SELECT value FROM demographics WHERE category = "marital" AND subcategory = "single"');
        matchPercentage *= singlePerc;
    }
    
    if (filters.excludeUnemployed) {
        const { value: employedPerc } = await db.get('SELECT value FROM demographics WHERE category = "employment" AND subcategory = "employed"');
        matchPercentage *= employedPerc;
    }
    
    const matchCount = Math.round(total.value * (matchPercentage / 100));
    
    return {
        matchCount,
        totalCount: total.value,
        percentage: matchPercentage
    };
} 