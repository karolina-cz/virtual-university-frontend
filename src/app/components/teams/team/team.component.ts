import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faFileAlt, faPlus, faQuestionCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../../core/models/user.model';
import {Team} from '../../../core/models/team/team.model';
import {TeamsService} from '../../../core/services/teams.service';
import {Observable} from 'rxjs';
import {MembersAutocompleteComponent} from '../members-autocomplete/members-autocomplete.component';
import {NgForm} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @ViewChild('fileDownload') fileDownload: ElementRef;
  @ViewChild('modalDeleteFile', {static: true}) modalDeleteFile: TemplateRef<any>;

  teamId;
  url;
  team: Team = new Team(null, null, null, null, null, null);
  model: NgbDateStruct;
  faFileAlt = faFileAlt;
  faTrash = faTrashAlt;
  fileName = 'Nie wybrano pliku';
  downloadName;
  file = null;
  faPlus = faPlus;
  faQuestionCircle = faQuestionCircle;
  files = [];
  isDataLoaded = false;
  isFileDownloading = false;
  modalData = {
    name: '',
    id: ''
  };
  constructor(private route: ActivatedRoute, private teamsService: TeamsService,
              private sanit: DomSanitizer, private modal: NgbModal) {
  }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params.id;
    this.teamsService.getTeamInfo(this.teamId).subscribe(
      (data) => {
        this.team = data;
      }
    );
    this.teamsService.getAllAttachments(this.teamId).subscribe(
      data => {
        // @ts-ignore
        for (const file of data.records){
          this.files.push({
            id: file.Id,
            name: file.Name
          });
        }
        this.isDataLoaded = true;
      }
    );
  }

  onFileSelected(target){
    this.fileName = target.files[0].name;
    this.file = target.files[0];
  }

  onSubmitFile(form: NgForm){
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      let result = '';
      if (typeof reader.result === 'string') {
        result = reader.result.split(',')[1];
      }
      this.teamsService.addAttachment(this.fileName, result, this.teamId).subscribe(data => {
        if (data !== 'error'){
          this.files.push({
            name: this.fileName,
            id: data.id
          });
        }
      });
    };
  }

  getAttachment(id, name){
    this.isFileDownloading = true;
    this.teamsService.getAttachment(id).subscribe(data => {
      // @ts-ignore
      const blob = data.slice(0, data.size, 'octet/stream');
      const url = window.URL.createObjectURL(blob);
      this.url = url;
      this.url = this.sanit.bypassSecurityTrustUrl(this.url);
      this.downloadName = name;
      setTimeout(() => {
        this.fileDownload.nativeElement.click();
      }, 500);
      this.isFileDownloading = false;
    });
  }

  openModal(file){
    this.modal.open(this.modalDeleteFile);
    this.modalData.name = file.name;
    this.modalData.id = file.id;
  }

  onDeleteFileClicked() {
    this.files = this.files.filter((file) => file.id !== this.modalData.id);
    this.teamsService.removeAttachment(this.modalData.id).subscribe();
  }

}
