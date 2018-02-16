// Import before use
import { Component, OnDestroy } from '@angular/core';
import { ToastService } from './shared/utils/toast/toast.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

// Decorator to define a component
@Component({
  selector: 'app-root',                 // Selector to be consumed as html element
  templateUrl: './app.component.html',  // Path to template
  styleUrls: ['./app.component.css']    // Styles in css or sass
})
// Components are instantiable classes
export class AppComponent {

    private sub: any;

    // Position of Ng2ToastyComponent
    public toastyComponentPosition: string;

    constructor( private slimLoader: SlimLoadingBarService,  private router: Router, private toastService: ToastService ) {
        // We listen the position's changes
        this.toastService.position$.subscribe(pos => this.toastyComponentPosition = pos);

        // Listen the navigation events to start or complete the slim bar loading
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.slimLoader.start();
            } else if ( event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError) {
                this.slimLoader.complete();
            }
        }, (error: any) => {
            this.slimLoader.complete();
        });
    }

    ngOnDestroy(): any {
        this.sub.unsubscribe();
    }
}

