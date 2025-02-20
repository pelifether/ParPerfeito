import json

# Static data from PNAD 2023
BRAZIL_DEMOGRAPHICS = {
    "total_population": 203700000,  # Total population 18+
    
    "gender": {
        "male": 0.485,
        "female": 0.515
    },
    
    "race": {
        "branca": 0.431,
        "preta": 0.102,
        "parda": 0.451,
        "amarela": 0.011,
        "indigena": 0.005
    },
    
    "age_groups": {
        "18-24": 0.14,
        "25-34": 0.20,
        "35-44": 0.18,
        "45-59": 0.24,
        "60+": 0.24
    },
    
    "income_percentiles": {
        "1000": 0.82,
        "2000": 0.63,
        "3000": 0.48,
        "5000": 0.28,
        "10000": 0.12,
        "20000": 0.04,
        "50000": 0.01
    },
    
    "employment": {
        "employed": 0.638,
        "unemployed": 0.362
    },
    
    "marital": {
        "single": 0.45,
        "married_or_stable": 0.55
    }
}

def create_json():
    with open('src/data/demographics.json', 'w', encoding='utf-8') as f:
        json.dump(BRAZIL_DEMOGRAPHICS, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    create_json()
    print("JSON file created successfully!") 