import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService, Activity } from '../../services/blog.service';
import { AssetsLoaderService } from '../../services/assets-loader';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent implements OnInit, OnDestroy {
  activityForm: FormGroup;
  activityId: number = 0;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private assetsLoader: AssetsLoaderService
  ) {
    this.activityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      image: [null] // For future image upload functionality
    });
  }

  ngOnInit() {
    this.assetsLoader.loadScript('assets/plugins/select2/js/select2.min.js');
    this.assetsLoader.loadScript('assets/js/feather.min.js');
    this.assetsLoader.loadScript('assets/js/ckeditor.js');
    this.assetsLoader.loadScript('assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js');
    this.assetsLoader.loadScript('assets/js/script.js');
    
    // Get activity ID from route parameters
    this.route.params.subscribe(params => {
      this.activityId = +params['id'];
      this.loadActivity();
    });

    // Initialize CKEditor when it's available
    setTimeout(() => {
      if (typeof (window as any).ClassicEditor !== 'undefined') {
        (window as any).ClassicEditor.create(document.querySelector('#editor'))
          .then((editor: any) => {
            editor.model.document.on('change:data', () => {
              this.activityForm.patchValue({
                description: editor.getData()
              });
            });
          })
          .catch((error: any) => {
            console.error('CKEditor initialization error:', error);
          });
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
    this.assetsLoader.unloadScript('assets/plugins/bootstrap-tagsinput/js/bootstrap-tagsinput.js');
    this.assetsLoader.unloadScript('assets/js/ckeditor.js');
    this.assetsLoader.unloadScript('assets/js/feather.min.js');
    this.assetsLoader.unloadScript('assets/plugins/select2/js/select2.min.js');
  }

  loadActivity() {
    this.isLoading = true;
    this.error = null;
    
    this.blogService.getActivityById(this.activityId).subscribe({
      next: (activity) => {
        this.activityForm.patchValue({
          name: activity.name,
          description: activity.description
        });
        
        // Update CKEditor content if initialized
        setTimeout(() => {
          const editorInstance = (window as any).ClassicEditor?.instances?.editor;
          if (editorInstance) {
            editorInstance.setData(activity.description || '');
          }
        }, 1500);
        
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load activity. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching activity:', err);
      }
    });
  }

  onSubmit() {
    if (this.activityForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const activityData: Activity = {
      name: this.activityForm.value.name,
      description: this.activityForm.value.description
    };

    this.blogService.updateActivity(this.activityId, activityData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = 'Failed to update activity. Please try again.';
        console.error('Error updating activity:', err);
      }
    });
  }
}