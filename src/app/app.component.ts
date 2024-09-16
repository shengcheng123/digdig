import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game/services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <button id="fullscreenButton" (click)="toggleFullscreen()">Fullscreen</button>
    <canvas #gameCanvas></canvas>
    <router-outlet></router-outlet>
  `,
  styles: [`
    canvas {
      width: 100%;
      height: 100%;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  ngAfterViewInit() {
    this.gameService.initGame(this.gameCanvas.nativeElement);
  }

  resizeCanvas() {
    const canvas = this.gameCanvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}