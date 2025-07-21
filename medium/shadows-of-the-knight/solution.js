/**
 * Shadows of the Knight - Episode 1
 * @author Camille Marchand
 */

/**

const DIRECTIONS = {
    UP: 'U',
    UP_RIGHT: 'UR', 
    RIGHT: 'R',
    DOWN_RIGHT: 'DR',
    DOWN: 'D',
    DOWN_LEFT: 'DL',
    LEFT: 'L',
    UP_LEFT: 'UL'
};

/**
 * Represents the search boundaries for the 2D binary search
 */
class SearchBounds {
    /**
     * Creates search boundaries
     * @param {number} minX - Minimum X coordinate (inclusive)
     * @param {number} maxX - Maximum X coordinate (inclusive) 
     * @param {number} minY - Minimum Y coordinate (inclusive)
     * @param {number} maxY - Maximum Y coordinate (inclusive)
     */
    constructor(minX, maxX, minY, maxY) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }

    /**
     * Updates search bounds based on bomb direction
     * Implements 2D binary search logic by eliminating impossible areas
     * 
     * @param {string} direction - Direction indicator from detector
     * @param {number} currentX - Current X position
     * @param {number} currentY - Current Y position
     */
    updateBounds(direction, currentX, currentY) {
        // Process horizontal component
        if (direction.includes('L')) {
            // Bombs are to the left - eliminate right half
            this.maxX = currentX - 1;
        } else if (direction.includes('R')) {
            // Bombs are to the right - eliminate left half
            this.minX = currentX + 1;
        }

        // Process vertical component  
        if (direction.includes('U')) {
            // Bombs are above - eliminate bottom half
            this.maxY = currentY - 1;
        } else if (direction.includes('D')) {
            // Bombs are below - eliminate top half
            this.minY = currentY + 1;
        }
    }

    /**
     * Calculates the optimal next position using binary search midpoint
     * 
     * @returns {Object} Next optimal jump position with x and y properties
     */
    getNextPosition() {
        // Binary search: always jump to the middle of remaining search space
        const nextX = Math.floor((this.minX + this.maxX) / 2);
        const nextY = Math.floor((this.minY + this.maxY) / 2);
        
        return { x: nextX, y: nextY };
    }

    /**
     * Gets the size of current search space (for debugging)
     * 
     * @returns {number} Number of possible positions remaining
     */
    getSearchSpaceSize() {
        const width = Math.max(0, this.maxX - this.minX + 1);
        const height = Math.max(0, this.maxY - this.minY + 1);
        return width * height;
    }
}

/**
 * Knight detector class - manages the bomb detection logic
 */
class KnightDetector {
    /**
     * Initializes the detector with building parameters
     * 
     * @param {number} buildingWidth - Width of building (W)
     * @param {number} buildingHeight - Height of building (H) 
     * @param {number} maxJumps - Maximum allowed jumps (N)
     * @param {number} startX - Starting X position
     * @param {number} startY - Starting Y position
     */
    constructor(buildingWidth, buildingHeight, maxJumps, startX, startY) {
        this.buildingWidth = buildingWidth;
        this.buildingHeight = buildingHeight;
        this.maxJumps = maxJumps;
        this.currentX = startX;
        this.currentY = startY;
        this.jumpCount = 0;
        
        // Initialize search bounds to entire building
        this.searchBounds = new SearchBounds(
            0, buildingWidth - 1,  // X bounds: [0, W-1]
            0, buildingHeight - 1  // Y bounds: [0, H-1]
        );
    }

    /**
     * Processes bomb direction and calculates next optimal jump
     * Core of the binary search algorithm
     * 
     * @param {string} bombDirection - Direction from detector
     * @returns {Object} Next jump coordinates with x and y properties
     */
    processDirectionAndJump(bombDirection) {
        // Validate direction input
        if (!this.isValidDirection(bombDirection)) {
            throw new Error(`Invalid direction: ${bombDirection}`);
        }

        // Update search boundaries based on current position and direction
        this.searchBounds.updateBounds(bombDirection, this.currentX, this.currentY);
        
        // Calculate optimal next position (binary search midpoint)
        const nextPosition = this.searchBounds.getNextPosition();
        
        // Update current position and jump counter
        this.currentX = nextPosition.x;
        this.currentY = nextPosition.y;
        this.jumpCount++;
        
        // Debug info (commented for production)
        // console.error(`Jump ${this.jumpCount}: Direction=${bombDirection}, Position=(${this.currentX},${this.currentY}), SearchSpace=${this.searchBounds.getSearchSpaceSize()}`);
        
        return nextPosition;
    }

    /**
     * Validates if direction string is valid
     * 
     * @param {string} direction - Direction to validate
     * @returns {boolean} True if direction is valid
     */
    isValidDirection(direction) {
        const validDirections = Object.values(DIRECTIONS);
        return validDirections.includes(direction);
    }

    /**
     * Checks if we have jumps remaining
     * 
     * @returns {boolean} True if jumps available
     */
    hasJumpsRemaining() {
        return this.jumpCount < this.maxJumps;
    }
}

// ===== MAIN EXECUTION =====

// Read building dimensions
const [W, H] = readline().split(' ').map(Number);

// Read maximum number of jumps
const N = parseInt(readline(), 10);

// Read starting position
const [X0, Y0] = readline().split(' ').map(Number);

// Initialize the knight detector with game parameters
const detector = new KnightDetector(W, H, N, X0, Y0);

// Main game loop - process each bomb direction
while (true) {
    // Read bomb direction from detector
    const bombDirection = readline().trim();
    
    // Calculate and execute optimal jump
    const nextPosition = detector.processDirectionAndJump(bombDirection);
    
    // Output next jump coordinates
    console.log(`${nextPosition.x} ${nextPosition.y}`);
    
    // Safety check
    if (!detector.hasJumpsRemaining()) {
        console.error('Warning: Maximum jumps reached');
        break;
    }
}
