import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OperadorGassoft';
  loggedIn: boolean;
  loading: boolean;
  scanningCarQR: boolean;
  scanningDriverQR: boolean;
  requireDriverQR: boolean;
  carQROutput: string;
  driverQROutput: string;
  carDetails: string;
  driverInfo: string;
  username: string;
  amount: number;


  constructor(private apiService: ApiService) {
    this.loggedIn = false;
    this.loading = false;
    this.scanningCarQR = false;
    this.scanningDriverQR = false;
    this.requireDriverQR = false;
    this.carQROutput = "";
    this.driverQROutput = "";
    this.carDetails = "";
    this.driverInfo = "";
    this.username = "";
    this.amount = 0;
  }
  
  
  ngOnInit(): void {
  }
  
  login() {
    let body = {
      email: 'abcde@mc.com', //this.loginForm.value['email'],
      password: '123456' //this.loginForm.value['password'],
    };
    console.log(body);
    this.loading = true;
    this.apiService.login(body).subscribe(res => {
      if (res['error']) {
        this.loading = false;
        return;
      } else {
        console.log(res);
        localStorage.setItem('auth-token', res.headers.get('Authorization'));
        this.loading = false;
        this.loggedIn = true;
      }
    });
  }
  
  showCarQRScanner() {
    this.scanningCarQR = true;
  }
  
  showDriverQRScanner() {
    this.scanningDriverQR = true;
  }
  
  cancelCarScan() {
    this.carQROutput = "";
    this.scanningCarQR = false;
  }

  cancelDriverScan() {
    this.driverQROutput = "";
    this.scanningDriverQR = false;
  }
  
  authorizeCar() {
    this.scanningCarQR = false;
    this.loading = true;
    this.apiService.getCarInfo("1234", "1234556").subscribe(res => {
      this.carDetails = res.carDetails;
      this.requireDriverQR = true;
      this.loading = false;
    });
  }
  
  authorizeDriver() {
    this.scanningDriverQR = false;
    this.loading = true;
    this.apiService.getDriverInfo("idchofer", "nip", "token").subscribe(res => {
      this.loading = false;
      this.driverInfo = res.driverInfo;
    });
  }

  updateAmount() {
    this.amount = 10;
  }

  checkSubmitProblem(): boolean {
    if (this.carDetails == ""
    || ( this.requireDriverQR && this.driverInfo == "")
    || this.amount <= 0) {
      return true;
    }
    return false;
  }

  registerTransaction() {
    alert("Correcto, se cerrará la sesión");
    this.loggedIn = false;
  }
}
