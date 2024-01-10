import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ExternalLibrariesServiceService } from './external-libraries-service.service';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { LocalStorageService } from './local-storage.service';

interface IExternalLib {
  src: string;
  integrity?: string;
  crossOrigin?: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  private localStorage: LocalStorageService = inject(LocalStorageService);

  private externalLibs: IExternalLib[] = [
    {
      src: 'https://code.jquery.com/jquery-3.7.1.min.js',
    },
  ];

  private obj = driver({
    popoverClass: "driverjs-theme",
    stagePadding: 4,
    animate: true,
    showProgress: false,
    allowClose: false,
    nextBtnText: 'Siguiente',
    prevBtnText: 'Anterior',
    doneBtnText: 'Entendido',
    progressText: '{{current}} de {{total}}',
    showButtons: ['next', 'previous', 'close'],
    steps: [
      { element: '#index0', popover: { title: 'Angular @Input: Complete Guide (With Input Transforms)', description: 'Learn how to use the Angular @Input decorator with all its many extra options, including the super-useful input transforms mechanism.', side: "left", align: 'start' } },
      { element: '#index1', popover: { title: 'Angular Standalone Components: Complete Guide', description: 'A complete guide to Angular standalone components. Learn why they are way better than regular components, and how to easily upgrade to them.', side: "bottom", align: 'start' } },
      { element: '#index2', popover: { title: 'Angular Signals: Complete Guide', description: 'A complete guide on how to use Signals in an Angular application. Learn signals, their benefits, best practices, and patterns, and avoid the most common pitfalls.', side: "bottom", align: 'start' } },
      { element: '#index3', popover: { title: 'Angular @defer: Complete Guide', description: 'A complete guide on how to use the Angular @defer syntax for doing partial template loading, including all the predefined triggers, how to build custom triggers, and how it compares to lazy loading.', side: "left", align: 'start' } },
      { element: '#index4', popover: { title: 'Angular Strictly Typed Forms (Complete Guide)', description: 'Learn the best way to leverage Angular Typed Forms in your projects. Add type safety to your form code by relying mostly on type inference, without needing to add extra type annotations.', side: "top", align: 'start' } },
      { popover: { title: 'Happy Coding', description: ' Join the millions of developers all over the world building with Angular in a thriving and friendly community. ' } }
    ],
    onCloseClick: () => {

    },
    onDestroyed: () => {
      this.endTour()
    }
  });

  ngOnInit(): void {
    // this.#injectLibrary();
    const tourFlag = this.localStorage.getItem('endTour');
    if (!tourFlag) {
      this.initTour()
    }
  }

  initTour = () => this.obj.drive();

  endTour = () => {
    this.localStorage.setItem('endTour', 'true');
  }

  #injectLibrary = () => {
    this.externalLibs.forEach((lib) =>
      ExternalLibrariesServiceService.injectLib(
        lib.src,
        lib.integrity,
        lib.crossOrigin
      )
    );
  }
  ngAfterViewInit(): void {}

}
