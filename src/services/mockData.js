// Generate a realistic dataset of 10,000 people
const generateMockData = () => {
  const data = [];
  const totalRecords = 10000;

  for (let i = 0; i < totalRecords; i++) {
    data.push({
      id: i,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      age: Math.floor(Math.random() * (80 - 18) + 18),
      height: Math.floor(Math.random() * (210 - 140) + 140),
      income: Math.floor(Math.random() * (50000 - 1000) + 1000),
      skinColor: ['branca', 'preta', 'parda', 'amarela', 'indigena'][Math.floor(Math.random() * 5)],
      education: ['fundamental', 'medio', 'superior', 'pos'][Math.floor(Math.random() * 4)],
      isMarried: Math.random() > 0.5,
    });
  }

  return data;
};

const mockPopulation = generateMockData();

export const calculateMatches = (filters) => {
  let matches = mockPopulation;

  // Apply filters
  if (filters.gender) {
    matches = matches.filter(person => person.gender === filters.gender);
  }

  if (filters.age) {
    matches = matches.filter(person => 
      person.age >= filters.age[0] && person.age <= filters.age[1]
    );
  }

  if (filters.height) {
    matches = matches.filter(person => 
      person.height >= filters.height[0] && person.height <= filters.height[1]
    );
  }

  if (filters.minIncome) {
    matches = matches.filter(person => person.income >= filters.minIncome);
  }

  if (filters.skinColor) {
    matches = matches.filter(person => person.skinColor === filters.skinColor);
  }

  if (filters.education) {
    matches = matches.filter(person => person.education === filters.education);
  }

  if (filters.excludeMarried) {
    matches = matches.filter(person => !person.isMarried);
  }

  return {
    matchCount: matches.length,
    totalCount: mockPopulation.length,
    percentage: (matches.length / mockPopulation.length) * 100,
    // Add some demographic breakdowns
    demographics: {
      genderBreakdown: calculateGenderBreakdown(matches),
      ageGroups: calculateAgeGroups(matches),
      educationBreakdown: calculateEducationBreakdown(matches),
    }
  };
};

const calculateGenderBreakdown = (matches) => {
  const male = matches.filter(p => p.gender === 'male').length;
  return {
    male: (male / matches.length) * 100,
    female: ((matches.length - male) / matches.length) * 100
  };
};

const calculateAgeGroups = (matches) => {
  const groups = {
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46-60': 0,
    '60+': 0
  };

  matches.forEach(person => {
    if (person.age <= 25) groups['18-25']++;
    else if (person.age <= 35) groups['26-35']++;
    else if (person.age <= 45) groups['36-45']++;
    else if (person.age <= 60) groups['46-60']++;
    else groups['60+']++;
  });

  // Convert to percentages
  Object.keys(groups).forEach(key => {
    groups[key] = (groups[key] / matches.length) * 100;
  });

  return groups;
};

const calculateEducationBreakdown = (matches) => {
  const education = {
    fundamental: 0,
    medio: 0,
    superior: 0,
    pos: 0
  };

  matches.forEach(person => {
    education[person.education]++;
  });

  // Convert to percentages
  Object.keys(education).forEach(key => {
    education[key] = (education[key] / matches.length) * 100;
  });

  return education;
}; 