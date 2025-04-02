import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService, Activity } from '../../services/blog.service';
import { AssetsLoaderService } from '../../services/assets-loader';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit, OnDestroy {
  activityForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
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

    this.blogService.createActivity(activityData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = 'Failed to add activity. Please try again.';
        console.error('Error adding activity:', err);
      }
    });
  }
}
