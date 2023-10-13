import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, timeInterval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showWarning: boolean = false;
  showQuiz: boolean = false;
  quizEnded: boolean = false;
  questionsList: any[] = [];
  currentQuestionNumber: number = 1;
  remainingTime:number = 15;
  myInterval!:number
  correctAnswerCount: number = 0;
  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.loadQuestions();
  }  

  loadQuestions(){
    this.http.get("assets/questions.json").subscribe((res:any)=>{
      this.questionsList = res;
    })
  }

  loadInterval(){
    const timer = interval(1000)
    timer.subscribe((res) =>{
      if(this.remainingTime > 0){
      this.remainingTime --;
      }
      if(this.remainingTime == 0){
        this.nextQuestion();
      }
    })
  }

  nextQuestion(){
    if(this.currentQuestionNumber < this.questionsList.length){
    this.currentQuestionNumber++;
    this.remainingTime = 15;
    }
  }

  selectOption(option:any){
    if(option.isCorrect){
      this.correctAnswerCount++
    }
    option.isSelected = true;
  }

  isOptionSelected(options:any){
    const selectionCount = options.filter((option:any)=> option.isSelected == true).length;
    if(selectionCount == 0){
      return false;
    } else{
      return true;
    }
  }

  showWarningPopUp() {
    this.showWarning = true;
}

getResult(){
  this.quizEnded = true;
  this.showQuiz = false;
}
  showQuizPopUp() {
    this.showWarning = false;
    this.showQuiz = true;
  }
  retakeQuiz(){
    window.location.reload();
  }
  exitQuiz(){
    window.location.reload();
  }
  hideQuizPopUp() {
    this.showWarning = false;
    this.showQuiz = false;
  } 
}
