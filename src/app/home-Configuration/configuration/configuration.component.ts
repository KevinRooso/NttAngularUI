import { Component} from '@angular/core';
declare var $;
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent {
  public = 'public';
  customer = 'customer';

}
