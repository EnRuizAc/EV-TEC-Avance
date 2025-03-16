import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicsumService {
  private apiUrl: string = 'https://picsum.photos/v2/list';
  
  private selectedItemSource = new BehaviorSubject<any>(null);
  selectedItem$ = this.selectedItemSource.asObservable();

  constructor(private http: HttpClient) {}

  getImages(page: number = 1, limit: number = 5): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getRandomPage(totalPages: number): number {
    return Math.floor(Math.random() * totalPages) + 1;
  }

  transformImages(response: any[]): any[] {
    return response.map((image: any) => ({
      id: image.id,
      url: `https://picsum.photos/id/${image.id}/800/300`,
      author: image.author
    }));
  }

  selectItem(item: any): void {
    this.selectedItemSource.next(item);
  }

  clearSelection(): void {
    this.selectedItemSource.next(null);
  }
}