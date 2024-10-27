import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer' /* @vite-ignore */;


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PdfViewerModule],
  styleUrl: './menu.component.scss',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
}
