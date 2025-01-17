import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  @Input() tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  desabilitarPrevious: boolean = false;


  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
    
    
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  previousStage(task:Task){
    
    if (task.stage ==0){
      const button = document.getElementById(task.name + 'back') as HTMLButtonElement;
      console.log(button);
      button.disabled = true;
      return;
    }

   

  }

  nextStage(task:Task){
    
    if (task.stage ==3){
      const button = document.getElementById(task.name + 'forward') as HTMLButtonElement;
      console.log(button);
      button.disabled = true;
      return;
    }

    console.log(task)

    let stageAtual = task.stage;
    task.stage = stageAtual + 1;
    console.log(task.stage);
    this.tasks.splice(stageAtual,1);
    this.tasks.push(task);
    this.configureTasksForRendering();
  }



}




interface Task {
  name: string;
  stage: number;
}