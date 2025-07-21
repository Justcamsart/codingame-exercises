/**
 * Temperatures - Codingame Easy Exercise
 * @author Camille Marchand
 */

/**


const NO_TEMPERATURES_RESULT = 0 as const;
const MIN_TEMPERATURE = -273 as const;
const MAX_TEMPERATURE = 5526 as const;

/**
 * Determines if a temperature is closer to zero than the current closest
 * Handles the special rule: positive wins in case of equal distance
 * 
 * @param candidate - Temperature to evaluate
 * @param current - Current closest temperature to zero
 * @returns true if candidate should replace current
 */
function isCloserToZero(candidate: number, current: number): boolean {
    const candidateDistance = Math.abs(candidate);
    const currentDistance = Math.abs(current);
    
    // If distances are different, choose the smaller one
    if (candidateDistance !== currentDistance) {
        return candidateDistance < currentDistance;
    }
    
    // If distances are equal, choose the positive one
    // This handles the rule: between -5 and 5, choose 5
    return candidate > current;
}

/**
 * Finds the temperature closest to zero from an array of temperatures
 * 
 * @param temperatures - Array of temperature values
 * @returns Temperature closest to zero, with positive preference on ties
 */
function findClosestToZero(temperatures: readonly number[]): number {
    if (temperatures.length === 0) {
        return NO_TEMPERATURES_RESULT;
    }
    
    // Initialize with first temperature - guaranteed to exist
    let closest = temperatures[0];
    
    // Start from index 1 since we already have the first temperature
    for (let i = 1; i < temperatures.length; i++) {
        const current = temperatures[i];
        
        if (isCloserToZero(current, closest)) {
            closest = current;
        }
    }
    
    return closest;
}

/**
 * Parses temperature string into array of numbers
 * Optimized for performance with explicit base 10 parsing
 * 
 * @param temperatureString - Space-separated temperature values
 * @returns Array of parsed temperature numbers
 */
function parseTemperatures(temperatureString: string): number[] {
    // Handle empty string case
    if (!temperatureString.trim()) {
        return [];
    }
    
    return temperatureString
        .trim()
        .split(' ')
        .filter(temp => temp.length > 0) // Remove empty strings
        .map(temp => parseInt(temp, 10)); // Explicit base 10 for performance
}

// Main execution - read input and solve
const n: number = parseInt(readline(), 10);

// Handle the case where no temperatures are provided
if (n === 0) {
    console.log(NO_TEMPERATURES_RESULT.toString());
} else {
    const temperatureString: string = readline();
    const temperatures = parseTemperatures(temperatureString);
    
    // Validate we have the expected number of temperatures
    if (temperatures.length !== n) {
        console.error(`Warning: Expected ${n} temperatures, got ${temperatures.length}`);
    }
    
    const result = findClosestToZero(temperatures);
    console.log(result.toString());
}
