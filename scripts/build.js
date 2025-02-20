const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the build directory exists
const buildDir = path.join(__dirname, '..', 'build');
if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}

// Run the database population script
console.log('Populating database...');
execSync('python scripts/populate_db.py', { stdio: 'inherit' });

// Copy the database to the build directory
console.log('Copying database to build directory...');
fs.copyFileSync(
    path.join(__dirname, '..', 'demographics.db'),
    path.join(buildDir, 'demographics.db')
);

// Run the regular React build
console.log('Building React application...');
execSync('react-scripts build', { stdio: 'inherit' });

console.log('Build completed successfully!'); 