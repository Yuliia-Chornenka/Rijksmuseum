import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { ImgHoverDirective } from './directives/img-hover.directive';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SortSearchFormComponent } from './components/sort-serach-form/sort-search-form.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { InformationPopupComponent } from './components/information-popup/information-popup.component';
import { ItemDetailsPageComponent } from './components/item-details-page/item-details-page.component';
import { BtnFavoriteComponent } from './components/btn-favorite/btn-favorite.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    SortSearchFormComponent,
    CollectionListComponent,
    MainPageComponent,
    InformationPopupComponent,
    ItemDetailsPageComponent,
    BtnFavoriteComponent,
    SearchPipe,
    SortPipe,
    ImgHoverDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
