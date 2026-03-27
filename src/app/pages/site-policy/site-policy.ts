import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Common } from '../../services/common';
import { ApiUrlHelper } from '../../common/ApiUrlHelper';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-site-policy',
  standalone: false,
  templateUrl: './site-policy.html',
  styleUrl: './site-policy.scss'
})
export class SitePolicy implements OnInit {

  // Common Properties
  termsAndConditions:string | any = '';
  privacyPolicy:string | any = '';
  instagramLink:string | any = '';
  facebookLink:string | any = '';
  twitterLink:string | any = '';
  youtubeLink:string | any = '';
  taxPercentage:number | any = 0;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  constructor(
    private readonly commonService:Common,
    private readonly api:ApiUrlHelper,
    private readonly toastr:ToastrService,
    private readonly spinner:NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.getSitePolicies();
  }

  getSitePolicies(){
    this.spinner.show();
    this.commonService.getData(this.api.SitePolicy.GetSitePolicies).subscribe({
      next:(response:any) =>{
        if(response?.success){
          console.log(response?.data.filter((item:any) => item.sitePolicyId === 1));
          this.termsAndConditions = response?.data.filter((item:any) => item.sitePolicyId === 1)[0]?.policyDescription;
          this.privacyPolicy = response?.data.filter((item:any) => item.sitePolicyId === 2)[0]?.policyDescription;
          this.facebookLink = response?.data.filter((item:any) => item.sitePolicyId === 3)[0]?.policyDescription;
          this.twitterLink = response?.data.filter((item:any) => item.sitePolicyId === 4)[0]?.policyDescription;
          this.instagramLink = response?.data.filter((item:any) => item.sitePolicyId === 5)[0]?.policyDescription;
          this.youtubeLink = response?.data.filter((item:any) => item.sitePolicyId === 6)[0]?.policyDescription;
          this.taxPercentage = response?.data.filter((item:any) => item.sitePolicyId === 7)[0]?.policyDescription;
        }
      },
      error:(error:any) =>{
        this.toastr.error(error?.error?.message);
      },
      complete:() =>{
        this.spinner.hide();
      }
    })
  }

  savePolicy(policyType:number,policyDescription:string){
    this.spinner.show();
    let requestedModel = {
      sitePolicyId : policyType,
      policyDescription: policyDescription
    }
    this.commonService.postData(this.api.SitePolicy.SaveSitePolicies,requestedModel).subscribe({
      next:(response:any) =>{
        if(response?.success){
          this.toastr.success(response?.message);
        }
      },
      error:(error:any) =>{
        this.toastr.error(error?.error?.message);
      },
      complete:() =>{
        this.spinner.hide();
      }
    })
  }

}
