# 🎨 Projet Angular - Application de Dessin et d'Animation

Une application interactive de dessin où vous pouvez choisir parmi diverses formes géométriques, personnaliser la couleur et la taille, puis les animer sur un canvas HTML5. Ce projet utilise **Angular** pour une interface dynamique et réactive.

## Fonctionnalités 🌟

- **Sélection des formes** : Choisissez parmi 20 formes géométriques (cercle, carré, étoile, polygones, etc.).
- **Animation fluide** : Les formes se déplacent et rebondissent continuellement sur le canvas.
- **Personnalisation** : Modifiez la couleur et la taille des formes en temps réel grâce à des contrôles interactifs.
- **Responsive** : L'application s'adapte automatiquement à différentes tailles d'écran.

## Prérequis 🔧

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Node.js** (version >= 14)
- **Angular CLI** (version >= 12)

## Installation 🚀

Suivez ces étapes pour configurer le projet sur votre machine locale.

### 1. Clonez ce repository

```bash
git clone https://github.com/votre-utilisateur/drawing-app.git
cd drawing-app
```
## 📖 Aperçu du projet

```
/drawing-app
├── /src
│   ├── /app
│   │   ├── /drawing
│   │   │   ├── drawing.component.ts    
│   │   │   ├── drawing.component.html   
│   │   │   └── drawing.component.css   
│   │   ├── /app.module.ts                
│   │   └── /app.component.ts            
├── /assets                             
├── /environments                       
├── angular.json                        
├── package.json                        
└── README.md                           
```

```
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
```

### Vidéo Exemple du Site (A SUIVRE)