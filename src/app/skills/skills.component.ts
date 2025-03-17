import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  isVisible = false;
  skills = [
    { name: 'HTML', progress: 90 },
    { name: 'CSS', progress: 80 },
    { name: 'JavaScript', progress: 75 },
    { name: 'Angular', progress: 70 },
    { name: 'TypeScript', progress: 85 }
  ];

  @HostListener('window:scroll', [])
  onScroll() {
    const element = document.getElementById('skills-text');
    if (element) {
      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight) {
        this.isVisible = true;
      }
    }
  }

  rotateCard(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'rotateY(180deg)'; 
  }

  resetRotation(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'rotateY(0deg)';
  }
}