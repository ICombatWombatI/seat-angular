import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StadiumService } from '../../service/stadium/stadium.service';
import { StandsService } from '../../service/stands/stands.service';
import { KiosksService } from '../../service/kiosk/kiosks.service';
import { VendorService } from '../../service/vendor/vendor.service';
import { KioskProduct } from '../../shared/ModalWindows/kiosk-product/KioskProduct';
import { ModalWindow } from '../../shared/ModalWindows/modal-window/ModalWindow';
import { ConfirmWindow } from '../../shared/ModalWindows/confirm-window/ConfirmWindow';
import { CStadium } from '../../shared/classes/stadium';
import { CStands } from '../../shared/classes/stands';
import { CKiosk } from '../../shared/classes/kiosk';
import { CVendors } from '../../shared/classes/vendor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-stadium',
  templateUrl: './create-stadium.component.html',
  styleUrls: ['./create-stadium.component.css']
})
export class CreateStadiumComponent implements OnInit {

  // Filds
  stadium: CStadium[] = [];
  stands: CStands[] = [];
  kiosks: CKiosk[] = [];
  vendor: CVendors[] = [];
  data_is_came: number = 0;
  kiosk_is: boolean = false;
  vender: string = "";
  img_selected: boolean = true;
  title_update: boolean = false;

  stadium_name: string = "";// Title name of the studium
  new_stadium_name: string = "";
  stadium_id: string = '0';// Title name of the studium  
  stadium_future_url: string = '0';// Title name of the studium  
  newStandTitle: string = "";// new title name of the Stand
  kioskTitle: string = ""; //
  password2: string = ""; //
  password1: string = ""; //
  title_img_name: string = "";
  stadium_data: FormData;
  vendor_is_exist: boolean = false;

  vendor_name: string = ""; //
  vendor_email: string = ""; //
  vendor_password: string = ""; //
  file: File;
  // Constructor
  constructor(public dialog: MatDialog,
    private StadiumService: StadiumService,
    private router: Router,
    private StandsService: StandsService,
    private KiosksService: KiosksService,
    private VendorService: VendorService) {
    /* Save id of stadium from  localStorage and delete it */
    /* If it no _id - navigate to /stadiums */
    this.stadium_id = localStorage.getItem("_id");
    localStorage.removeItem("_id");
    if (this.stadium_id == null) {
      this.router.navigate(['/stadiums']);
    }
  }
  // ng funk
  ngOnInit() {
    /* Auto load data */
    this.getStadiumById(this.stadium_id);
    this.getStands(this.stadium_id);
    this.getKiosks(this.stadium_id);
    this.getVendors(this.stadium_id);
    this.stadium_data = new FormData();
  }

  ngAfterContentChecked() {
    if (this.stadium_name !== this.new_stadium_name) {
      this.title_update = true;
      if (!this.stadium_data.get("name_marker"))
        this.stadium_data.append("name_marker", "true");
    }

    /* Check if vendor is came */
    if (this.vendor == null) {
      this.vendor_is_exist = false;
    } else if (this.vendor.length) {
      this.vendor_is_exist = true;
      this.vendor_name = this.vendor[0].vendor_name;
      this.vendor_email = this.vendor[0].vendor_email;
    }

    /* Check if stadium data is came */
    if (this.stadium.length && this.data_is_came != 1) {
      this.data_is_came = 1;
      this.stadium_future_url = this.stadium[0].stadium_featured_url;
      this.stadium_name = this.stadium[0].stadium_name;
      this.new_stadium_name = this.stadium_name;
    }
  }

  //-----------Stadium------------//
  getStadiumById(stadium_id: any) {
    this.StadiumService.getStadiumById(stadium_id).subscribe(data => this.stadium = data);
  }

  updateChanges() {
    let dialogRef = this.dialog.open(ModalWindow, {
      width: '350px',
      data: { message: "Are you shure?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stadium_data.append("stadium_id", this.stadium_id);
        this.stadium_data.append("stadium_name", this.new_stadium_name);
        if (!this.img_selected) {
          let  stadium_featured_url  = this.stadium_future_url.split("http://4ei.store/")
          this.stadium_data.append("stadium_featured_url",stadium_featured_url[1] );
         
          this.stadium_data.append("file_marker", "true");
          this.stadium_data.append("T_IMG", this.file, this.file.name);
        }
        this.stadium.splice(0, this.stadium.length);
        this.StadiumService.updateStadium(this.stadium_data).subscribe(data => this.stadium = data);
        this.data_is_came = 0;
        this.cancelChanges();
      }
    });
  }

  //-----------Vendor------------//
  getVendors(stadium_id) {
    this.VendorService.getVendor(stadium_id).subscribe(data => this.vendor = data);
  }

  deleteVendor() {
    let dialogRef = this.dialog.open(ModalWindow, {
      width: '350px',
      data: { message: "Are you shure?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let vendor_data: FormData;
        vendor_data = new FormData();
        vendor_data.append('vendor_id', this.vendor[0].vendor_id.toString());
        this.VendorService.deleteVendor(vendor_data);
        this.vendor.splice(0, this.vendor.length);
        this.vendor = null;
        this.vendor_name = "";
        this.vendor_email = "";
      }
    });
  }

  createVendor() {
    this.vendor_name = this.vendor_name.replace(/^\s*/, '').replace(/\s*$/, '');
    this.vendor_email = this.vendor_email.replace(/^\s*/, '').replace(/\s*$/, '');
    this.vendor_password = this.vendor_password.replace(/^\s*/, '').replace(/\s*$/, '');

    if (this.vendor_name === "" || this.vendor_email === "" || this.vendor_password === "") {
      let dialogRef = this.dialog.open(ConfirmWindow, {
        width: '350px',
        data: { message: "Some fields are empty" }
      });
    } else {
      let vendor_data: FormData = new FormData;
      vendor_data.append("vendor_name", this.vendor_name);
      vendor_data.append("vendor_email", this.vendor_email);
      vendor_data.append("stadium_id", this.stadium_id);
      vendor_data.append("vendor_password", this.vendor_password);
      let data = {
        "vendor_name": this.vendor_name,
        "vendor_email": this.vendor_email,
        "stadium_id": this.stadium_id,
        "vendor_password": this.vendor_password
      };
      this.VendorService.createVendor(data).subscribe(data => this.vendor = data);

      this.vendor_password = "";
    }
  }

  //-----------Stand------------//
  getStands(stadium_id: any) {
    this.StandsService.getStands(stadium_id).subscribe(data => this.stands = data);
  }

  createStand() {
    this.newStandTitle = this.newStandTitle.replace(/^\s*/, '').replace(/\s*$/, '');
    if (this.newStandTitle === "") {
      let dialogRef = this.dialog.open(ConfirmWindow, {
        width: '350px',
        data: { message: "Field are empty" }
      });
    } else {
      this.stands.splice(0, this.stands.length);
      this.StandsService.createStand(this.stadium_id, this.newStandTitle).subscribe(data => this.stands = data);
      this.newStandTitle = "";
    }
  }

  deleteStand(stand_id, index) {
    let dialogRef = this.dialog.open(ModalWindow, {
      width: '350px',
      data: { message: "Are you shure?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let stand_data: FormData;
        stand_data = new FormData();
        stand_data.append('stand_id', stand_id);
        this.stands.splice(index, 1);
        this.StandsService.deleteStand(stand_data);
      }
    });
  }

  //-----------Kiosk------------//
  openKiosk(kiosk_id, kiosk_name) {
    let dialogRef = this.dialog.open(KioskProduct, {
      width: '600px',
      data: {
        kiosk_id: kiosk_id,
        kiosk_name: kiosk_name
      }
    });
  }

  getKiosks(stund_id: any) {
    this.KiosksService.getKiosks(stund_id).subscribe(data => this.kiosks = data);
  }

  createKiosk(stand_id) {
    this.kioskTitle = this.kioskTitle.replace(/^\s*/, '').replace(/\s*$/, '');
    if (this.kioskTitle !== "") {
      this.kiosks.splice(0, this.kiosks.length);
      this.KiosksService.createKiosk(stand_id, this.kioskTitle, this.stadium_id).subscribe(data => this.kiosks = data);
      this.kioskTitle = "";
    } else {
      alert("Bade name");
    }
  }

  deleteKiosk(kiosk_id, index) {
    let kiosk_data: FormData;
    kiosk_data = new FormData();
    kiosk_data.append('kiosk_id', kiosk_id);
    this.kiosks.splice(index, 1);
    this.KiosksService.deleteKiosk(kiosk_data);
  }

  updateKiosk() {

  }

  // update title img logic
  deleteImg() {
    this.img_selected = !this.img_selected;
  }

  uploadImg(event) {
    this.file = event.target.files.item(0);
    if ((this.file.type.match('image/jpeg') || this.file.type.match('image/png')) && this.file.size < 1000000) {
      this.title_img_name = this.file.name;
      this.title_update = true;
    } else {
      alert('Invalid format of the file or size is to big!');
    }
  }
  cancelChanges() {
    this.new_stadium_name = this.stadium_name;
    this.img_selected = true;
    this.title_update = false;
    this.title_img_name = "";
    this.stadium_data = null;
    this.stadium_data = new FormData();
    this.file = null;
  }

}
