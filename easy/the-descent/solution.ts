/**
 * The Descent - Codingame Easy Exercise
 * @author Camille Marchand
 * @version 1.0.0
 */

/**

const MOUNTAIN_COUNT = 8 as const;
const INITIAL_MAX_HEIGHT = -1; // Below minimum possible height (0)

// Game loop - represents each turn of the game
while (true) {
    // Track the highest mountain found in this turn
    let maxHeight: number = INITIAL_MAX_HEIGHT;
    let targetMountainIndex: number = 0;
    
    // Read all mountain heights and find the highest one in a single pass
    for (let i = 0; i < MOUNTAIN_COUNT; i++) {
        const mountainH: number = parseInt(readline()); // Height of mountain at index i
        
        // Update target if this mountain is higher than current maximum
        // Using > ensures we get the first (leftmost) mountain in case of ties
        if (mountainH > maxHeight) {
            maxHeight = mountainH;
            targetMountainIndex = i;
        }
    }

    // Debug output for development (commented out for production)
    // console.error(`Turn info: Max height=${maxHeight}, Target index=${targetMountainIndex}`);
    
    // Output: The index of the mountain to fire on
    console.log(targetMountainIndex.toString());
}
