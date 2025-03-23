import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, Activity } from '../../services/blog.service';
import { AssetsLoaderService } from '../../services/assets-loader';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit, OnDestroy {
  activities: Activity[] = [];
  isLoading = false;
  error: string | null = null;
  selectedActivityId: number | null = null;

  constructor(
    private blogService: BlogService,
    private assetsLoader: AssetsLoaderService
  ) {}

  ngOnInit() {
    this.loadActivities();
    this.assetsLoader.loadScript('assets/plugins/select2/js/select2.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
    this.assetsLoader.unloadScript('assets/plugins/select2/js/select2.min.js');
  }

  loadActivities() {
    this.isLoading = true;
    this.error = null;
    this.blogService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load activities. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching activities:', err);
      }
    });
  }

  prepareDelete(id: number) {
    this.selectedActivityId = id;
  }

  deleteActivity() {
    if (this.selectedActivityId) {
      this.blogService.deleteActivity(this.selectedActivityId).subscribe({
        next: () => {
          this.activities = this.activities.filter(
            activity => activity.id !== this.selectedActivityId
          );
          this.selectedActivityId = null;
        },
        error: (err) => {
          console.error('Error deleting activity:', err);
          this.error = 'Failed to delete activity. Please try again.';
        }
      });
    }
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}