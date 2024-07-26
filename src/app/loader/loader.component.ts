import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {LoaderService} from "../services/loader.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;

  constructor(private loaderService: LoaderService) {}
}
