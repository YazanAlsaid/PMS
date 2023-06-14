import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EntryComponent} from './components/entry/entry.component';
import {AppScannerComponent} from "./components/app-scanner/app-scanner.component";

const routes: Routes = [
  {
    path: '', component: AppScannerComponent, children: [
      {path: 'entry', component: EntryComponent, pathMatch: 'full'},
      {path: '', redirectTo: '/scanner/entry', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerRoutingModule {
}

export const RoutedComponents = [
  AppScannerComponent,
  EntryComponent
]
