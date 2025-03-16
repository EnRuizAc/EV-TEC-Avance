import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PicsumService } from '../picsum.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  items: any[] = [];
  currentPage: number = 1;
  totalPages: number = 6;
  loading: boolean = false;

  constructor(private picsumService: PicsumService, private router: Router) {}

  ngOnInit(): void {
    this.picsumService.clearSelection();
    this.loadItems(this.currentPage);
  }

  loadItems(page: number): void {
    this.loading = true;
    this.picsumService.getImages(page, 10).subscribe(response => {
      this.items = this.picsumService.transformImages(response);
      this.loading = false;
    });
  }

  selectItem(item: any): void {
    this.picsumService.selectItem(item);
    this.router.navigate(['/home']);
  }

  changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadItems(newPage);
    }
  }
}