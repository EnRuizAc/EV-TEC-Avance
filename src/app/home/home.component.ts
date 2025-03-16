import { Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PicsumService } from '../picsum.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';  // Componente para el contenido del modal

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
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  isLoggedIn: boolean = false;
  userEmail: string | null = null;
  images: any[] = [];
  currentPage: number = 1;
  totalImages: number = 30;
  totalPages: number = 6;
  swiper: any;
  selectedItem: any = null;
  isSwiperInitialized: boolean = false;
  isModalOpen: boolean = false;
  selectedImage: any = null;

  cards = [
    { url: 'https://picsum.photos/id/40/500/300?', title: 'Imagen 1' },
    { url: 'https://picsum.photos/id/169/500/300?', title: 'Imagen 2' },
    { url: 'https://picsum.photos/id/219/500/300?', title: 'Imagen 3' }
  ];

  constructor(
    private authService: AuthService, 
    private picsumService: PicsumService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.userEmail = localStorage.getItem('email');
      }
    });

    this.loadImages(this.picsumService.getRandomPage(this.totalPages));

    this.picsumService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    });
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngAfterViewChecked(): void {
    if (!this.isSwiperInitialized && this.images.length > 0) {
      this.initSwiper();
      this.isSwiperInitialized = true;
    }
  }

  ngOnDestroy(): void {
    this.picsumService.clearSelection();
  }

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

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadImages(page);
    }
  }

  navigateToListado(): void {
    this.router.navigate(['/listado']);
  }

  private initSwiper(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    
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

  openModal(card: any): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: card
    });
  }
}
