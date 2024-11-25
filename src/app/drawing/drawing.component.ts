import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;

  // Paramètres de dessin
  shape: string = 'circle'; // Forme par défaut (cercle)
  color: string = '#0000ff'; // Couleur par défaut (bleu)
  size: number = 50; // Taille par défaut
  private x: number = 50; // Position initiale
  private y: number = 50; // Position initiale
  private dx: number = 2; // Vitesse en x
  private dy: number = 2; // Vitesse en y

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.startDrawing();
  }

  // Démarrer le dessin et l'animation
  startDrawing(): void {
    this.animate();
  }

  // Animation continue
  animate(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height); // Effacer le canvas
    this.drawShape(); // Dessiner la forme
    this.moveShape(); // Déplacer la forme
    requestAnimationFrame(() => this.animate()); // Répéter l'animation
  }

  // Dessiner la forme sélectionnée
  drawShape(): void {
    this.ctx.fillStyle = this.color;

    if (this.shape === 'circle') {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Cercle
      this.ctx.fill();
    } else if (this.shape === 'square') {
      this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); // Carré
    } else if (this.shape === 'line') {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x + this.size, this.y); // Ligne
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 5;
      this.ctx.stroke();
    } else if (this.shape === 'triangle') {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y - this.size); // Point supérieur
      this.ctx.lineTo(this.x - this.size, this.y + this.size); // Point bas gauche
      this.ctx.lineTo(this.x + this.size, this.y + this.size); // Point bas droit
      this.ctx.closePath();
      this.ctx.fill();
    } else if (this.shape === 'star') {
      this.drawStar();
    } else if (this.shape === 'heart') {
      this.drawHeart();
    } else if (this.shape === 'pentagon') {
      this.drawPolygon(5); // Dessiner un pentagone
    } else if (this.shape === 'hexagon') {
      this.drawPolygon(6); // Dessiner un hexagone
    } else if (this.shape === 'octagon') {
      this.drawPolygon(8); // Dessiner un octogone
    } else if (this.shape === 'rectangle') {
      this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 3, this.size * 2, this.size); // Rectangle
    } else if (this.shape === 'ellipse') {
      this.ctx.beginPath();
      this.ctx.ellipse(this.x, this.y, this.size, this.size / 2, 0, 0, Math.PI * 2); // Ellipse
      this.ctx.fill();
    }
  }

  // Dessiner une étoile
  drawStar(): void {
    const outerRadius = this.size;
    const innerRadius = this.size / 2;
    this.ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      this.ctx.lineTo(this.x + outerRadius * Math.cos(angle), this.y + outerRadius * Math.sin(angle));
      this.ctx.lineTo(this.x + innerRadius * Math.cos(angle + Math.PI / 5), this.y + innerRadius * Math.sin(angle + Math.PI / 5));
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  // Dessiner un cœur
  drawHeart(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y + this.size / 4);
    this.ctx.arc(this.x - this.size / 4, this.y - this.size / 4, this.size / 4, Math.PI, 0, true); // Gauche
    this.ctx.arc(this.x + this.size / 4, this.y - this.size / 4, this.size / 4, Math.PI, 0, true); // Droit
    this.ctx.closePath();
    this.ctx.fill();
  }

  // Dessiner un polygone avec n côtés
  drawPolygon(sides: number): void {
    const angle = (2 * Math.PI) / sides;
    this.ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      this.ctx.lineTo(
        this.x + this.size * Math.cos(i * angle),
        this.y + this.size * Math.sin(i * angle)
      );
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  // Déplacer la forme sur le canvas
  moveShape(): void {
    if (this.x + this.size > this.canvasRef.nativeElement.width || this.x - this.size < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.size > this.canvasRef.nativeElement.height || this.y - this.size < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  // Méthodes pour gérer les changements via ngModel
  changeShape(shape: string): void {
    this.shape = shape;
  }

  changeColor(color: string): void {
    this.color = color;
  }

  changeSize(size: number): void {
    this.size = size;
  }
}
