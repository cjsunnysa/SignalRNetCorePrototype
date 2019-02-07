import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NewsPageComponent } from './news.page.component';
import { NewsService } from './services/news-service';
import { NewsEffects } from './effects/news.effects';
import { reducer } from './reducers/news.reducer';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forFeature('news', reducer),
        EffectsModule.forFeature([NewsEffects])
    ],

    declarations: [
        NewsPageComponent
    ],

    providers: [
        NewsService
    ],

    exports: [
        NewsPageComponent
    ]
})
export class NewsModule { }
