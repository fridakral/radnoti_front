import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import {
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import { ListsDataObj } from 'src/app/DTOs/ListDTOs';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { HeaderServiceService } from 'src/app/services/header-service/header-service.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() projectName: string;
  @Input() listsData: ListsDataObj[];
  @Input() projectID: number;

  onMainPage: Boolean;
  canvas: Boolean = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private router: Router,
    private header: HeaderServiceService,
    private projectService: ProjectService,
    private deleteService: DeleteService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    if (!this.listsData || this.listsData == [] || this.listsData.length == 0) {
      this.canvas = false;
      return;
    } else {
      let number = 0;
      this.listsData.forEach((data) => {
        number += data.taskNumber;
        if (number != 0) {
          this.canvas = true;
        }
        if (number == 0) this.canvas = false;

        (this.pieChartLabels as unknown as string[]).push(data.listName);
        (this.pieChartData as unknown as number[]).push(data.taskNumber);
      });
    }
  }

  moveToProject() {
    this.header.changeOnMainPage((this.onMainPage = true));
    localStorage.setItem('current_project', JSON.stringify(this.projectID));
    this.router.navigate(['main']);
  }

  deleteProject() {
    this.projectService.deleteProject(this.projectID).subscribe(
      (res) => {
        this.deleteService.deleteProject(true);
      },
      (error: HttpErrorResponse) => {
        this.deleteService.deleteProject(true);
      }
    );
  }
}
