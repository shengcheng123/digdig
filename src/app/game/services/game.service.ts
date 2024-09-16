import { Injectable } from '@angular/core';
import { Game } from '../../../game';
import { Player } from '../../../player';
import { Terrain } from '../../../terrain';
import { Shop } from '../../../shop';
import { TitleScreen } from '../../../titleScreen';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game!: Game;

  constructor() {}

  // Port your game logic from the original files (game.ts, player.ts, terrain.ts, etc.) to this service
  // You may want to create separate services for different aspects of your game

  initGame(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }

    const terrain = new Terrain(canvas.width, canvas.height);
    const player = new Player(canvas.width / 2, canvas.height / 2, 100, 10, ctx, terrain);
    const shop = new Shop(player, ctx);
    const titleScreen = new TitleScreen(canvas, ctx, () => {
      console.log('Game started');
      this.game.startGame();
    });

    this.game = new Game(canvas);
    this.game.initialize(ctx, player, terrain, shop, titleScreen);
  }

  // Add other game-related methods here
}