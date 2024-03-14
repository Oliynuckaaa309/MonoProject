import { Component, OnInit } from '@angular/core';
import { actions } from '../../../../shared/interfaces/actions';
import { ApiService } from '../../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-action-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-detail.component.html',
  styleUrl: './action-detail.component.sass'
})
export class ActionDetailComponent implements OnInit {
  public actionPath!:string;
  public actionDetails!: actions;
  public actionText!:string[];
  constructor(private route: ActivatedRoute,
    private data: ApiService){}
ngOnInit():void{
  this.route.paramMap.subscribe((param)=>{
    this.actionPath=param.get('path') as string;
    this.data.getOneActiontByPath(this.actionPath).subscribe(
      (res)=>{
        this.actionDetails=res[0];
        this.actionText=res[0].description.split('.');

      }
    )
  })


}
}
