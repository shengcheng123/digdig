import { Player, Emote } from './player';
import { Terrain, Block } from './terrain';

export class Enemy extends Player {
    private target: Player;
    private randomDirection: { x: number, y: number } = { x: 0, y: 0 };
    private randomMovementDuration: number = 0;
    private goldDetectionRadius: number = 100; // Radius to detect gold

    constructor(x: number, y: number, terrainWidth: number, terrainHeight: number, context: CanvasRenderingContext2D, target: Player, terrain: Terrain) {
        super(x, y, 50, 5, context, terrain);
        this.target = target;
        this.setSize(20); // Set initial size
    }

    public override getSpeed(): number {
        return super.getSpeed() * 0.2;
    }

    public override update(terrain: Terrain, screenWidth: number, screenHeight: number, cameraX: number, cameraY: number) {
        super.update(terrain, screenWidth, screenHeight, cameraX, cameraY);

        if (this.checkOffScreen(screenWidth, screenHeight, cameraX, cameraY)) {
            this.performRandomMovement();
        } else {
            this.moveTowardsTargetOrGold(terrain);
        }

        const dugBlocks = this.dig(terrain);
        for (const block of dugBlocks) {
            this.handleDugBlock(block);
        }

        this.updateRingRotation();

        if (Math.random() < 0.001) {
            const randomEmote = Math.floor(Math.random() * Object.keys(Emote).length / 2) as Emote;
            this.displayEmote(randomEmote);
        }
    }

    private checkOffScreen(screenWidth: number, screenHeight: number, cameraX: number, cameraY: number): boolean {
        const x = this.getX();
        const y = this.getY();
        return (
            x < cameraX ||
            x > cameraX + screenWidth ||
            y < cameraY ||
            y > cameraY + screenHeight
        );
    }

    private performRandomMovement() {
        // ... (random movement logic)
    }

    private moveTowardsTargetOrGold(terrain: Terrain) {
        // ... (movement logic towards target or gold)
    }

    protected override handleDugBlock(block: Block) {
        // ... (existing handleDugBlock logic)
        this.adjustSizeBasedOnScore();
    }

    private adjustSizeBasedOnScore() {
        // ... (size adjustment logic)
    }

    public override draw(visibleWidth: number, visibleHeight: number) {
        super.draw(visibleWidth, visibleHeight);
        
        // Add any enemy-specific drawing code here
        // For example, you might want to change the color or add some distinguishing feature
        
        const context = this.getContext();
        const x = this.getX();
        const y = this.getY();
        const size = this.getSize();

        // Draw a red outline for the enemy
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(x, y, size / 2 + 2, 0, Math.PI * 2);
        context.stroke();
    }

    public setNewPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}