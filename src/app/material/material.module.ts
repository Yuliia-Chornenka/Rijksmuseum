import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const components = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: [...components],
  exports: [...components],
})
export class MaterialModule {}
