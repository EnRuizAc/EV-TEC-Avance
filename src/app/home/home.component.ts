import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { PicsumService } from '../picsum.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  userEmail: string | null = null;
  images: string[] = [];
  currentPage: number = 1;
  totalImages: number = 30;
  totalPages: number = 6;
  swiper: any;

  constructor(private authService: AuthService, private picsumService: PicsumService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.userEmail = localStorage.getItem('email');
      }
    });

    // Obtener una página aleatoria y cargar las imágenes
    this.loadImages(this.picsumService.getRandomPage(this.totalPages));
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  // Método para cargar las imágenes con paginación desde el servicio
  loadImages(page: number = 1): void {
    this.picsumService.getImages(page, 5).subscribe((response) => {
      this.images = this.picsumService.transformImages(response);
      this.totalPages = Math.ceil(this.totalImages / 5);
      this.currentPage = page;

      if (this.swiper) {
        this.swiper.update();
      }
    });
  }

  // Método para navegar entre las páginas
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadImages(page);
    }
  }
}
