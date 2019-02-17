import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WardViewOptionsPage } from './ward-view-options.page';

const routes: Routes = [
  {
    path: '',
    component: WardViewOptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WardViewOptionsPage]
})
export class WardViewOptionsPageModule {}
