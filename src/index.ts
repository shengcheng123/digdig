import { Game } from './game';
import { TitleScreen } from './titleScreen';

class GameManager {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private game: Game | null = null;
    private titleScreen: TitleScreen;
    private controlToggleButton: HTMLButtonElement;

    constructor() {
        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.titleScreen = new TitleScreen(this.canvas, this.context, () => this.startGame());
        this.controlToggleButton = document.createElement('button');
        this.controlToggleButton.textContent = 'Toggle Controls';
        this.controlToggleButton.style.position = 'absolute';
        this.controlToggleButton.style.top = '50px';
        this.controlToggleButton.style.right = '10px';
        this.controlToggleButton.style.zIndex = '1000';
        document.body.appendChild(this.controlToggleButton);
    }

    public init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.showTitleScreen();
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.game) {
            this.game.resizeCanvas();
        }
    }

    private showTitleScreen() {
        this.titleScreen.show();
        this.controlToggleButton.style.display = 'none';
    }

    private startGame() {
        this.game = new Game('gameCanvas');
        this.setupFullscreenButton();
        this.setupControlToggleButton();
        this.controlToggleButton.style.display = 'block';
    }

    private setupFullscreenButton() {
        const fullscreenButton = document.getElementById('fullscreenButton')!;
        fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
    }

    private setupControlToggleButton() {
        this.controlToggleButton.addEventListener('click', () => {
            if (this.game) {
                this.game.toggleControls();
            }
        });
    }

    private toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

window.onload = () => {
    const gameManager = new GameManager();
    gameManager.init();
};