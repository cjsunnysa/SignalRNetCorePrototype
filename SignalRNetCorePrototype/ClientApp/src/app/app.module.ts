import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NewsModule } from './news/news.module';
import { NewsPageComponent } from './news/news.page.component';
import { BaseHrefInterceptor } from './base.href.interceptor';

export function getBaseUrl(): string {
    return document.getElementsByTagName('base')[0].href;
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'news', component: NewsPageComponent, pathMatch: 'full' },
        ]),
        NewsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: HTTP_INTERCEPTORS, useClass: BaseHrefInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
