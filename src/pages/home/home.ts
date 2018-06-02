import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

//Imports agregados por mi
import { AlertController } from 'ionic-angular';
////import { Media, MediaObject } from '@ionic-native/media';



//imports agregados para probar el audio record
////import { Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
////import { Platform } from 'ionic-angular';

//Sonido
// import { Media, MediaObject } from '@ionic-native/media';
// import { File } from '@ionic-native/file';
import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  animales:boolean = true;
  juegos:boolean = false;
  peliculas:boolean = false;
  simpsons:boolean = false;
  contador:any ="0";
  private secuenciaGrabada = [];
  public indice =0;
  mostrarPlay = false;
  mostrarStop = false;
  mostrarSpiner:boolean = false;
  apagarbotones:boolean =false;
  public reproductor:boolean = true;

  arraySonidos : Array <any> = [
    {nombre: "cuervo",tipo:".mp3",id:1},
    {nombre: "delfin",tipo:".mp3",id:2},
    {nombre: "grillo",tipo:".mp3",id:3},
    {nombre: "pavo",tipo:".mp3",id:4},
    {nombre: "mario",tipo:".mp3",id:5},
    {nombre: "sonic",tipo:".mp3",id:6},
    {nombre: "donkey",tipo:".mp3",id:7},
    {nombre: "pacman",tipo:".mp3",id:8},
    {nombre: "starwars",tipo:".mp3",id:9},
    {nombre: "psicosis",tipo:".mp3",id:10},
    {nombre: "tiburon",tipo:".mp3",id:11},
    {nombre: "piratas",tipo:".mp3",id:12},
];

  miPlaylist : Array <any> = []

  audio = new Audio();
  private sonidoReproduccion;



  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public afDB: AngularFireDatabase,
    private MiAuth:AngularFireAuth,
    public toastCtrl: ToastController,
    //public platform:Platform,
    //public media: Media,
    ////public events: Events,
    public nativeAudio: NativeAudio,
    public loadingCtrl: LoadingController){
  }
  cerrarSesion() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Está seguro?',
      cssClass: 'errorAlert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel click');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Si click');
            this.MiAuth.auth.signOut();
            //window.location.reload();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
  cargando() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 3000
    });
    //loader.present();
    //return loader.present();
    return loader;
  }
  mostrarToast(miMsj:string,color:string) {
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText:"cerrar",
      cssClass: color,
      message: miMsj,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  vistaJuego(){
    this.animales =false;
    this.peliculas = false;
    this.juegos = true;
    this.simpsons = false;

  }

  vistaPeli(){
    this.animales =false;
    this.peliculas = true;
    this.juegos = false;
    this.simpsons = false;
    
  }

  vistaAnimal(){
    this.animales =true;
    this.peliculas = false;
    this.juegos = false;
    this.simpsons = false;
  }
  vistaSimpsons(){
    this.animales = false;
    this.peliculas = false;
    this.juegos = false;
    this.simpsons = true;
  }
//   public hacerSonar(tipo:string): Promise<any> {
//     console.log("tipo: ",tipo);
//     let sonido = 'assets/sonidos/'+tipo+'.mp3'
//     console.log("Sonido: ",sonido);
//     this.nativeAudio.stop(tipo)

//     if (this.platform.is('cordova')) {
//         return this.platform.ready()
//             .then(() => this.nativeAudio.preloadComplex( tipo, sonido, 0.5, 1, 0))
//             .then(() => this._intervalId = setInterval(() => this.nativeAudio.play( tipo), 3000));
//     }
//     return Promise.resolve();
// }

  //private _intervalId;


  hacerSonar(tipo:string) {
    console.log("tipo: ",tipo);
    let sonido = 'assets/sonidos/'+tipo+'.mp3'
    console.log("Sonido: ",sonido);
    this.indice = 0;
    this.mostrarPlay = true;
    //this.mostrarToast("Sonido almacenado","succesAlert");



      setTimeout( () => {
        this.audio.src = sonido;
        //this.audio.remove();
        this.audio.pause();
        this.audio.load();
        this.audio.play();
        //this.miPlaylist.push(tipo)
        console.log("contado antes: ",this.contador);
        
        this.nativeAudio.preloadSimple(this.contador, sonido).then((menj)=>console.log(menj),(err)=>console.log(err));
      }, 1000 );
      
      //this.secuenciaGrabada.push(this.contador)

      setTimeout( () => {
        this.secuenciaGrabada.push(this.contador)
        console.log("this.secuenciaGrabada: ",this.secuenciaGrabada);
        
        //this.nativeAudio.play(this.contador, () => console.log(this.contador, 'is done playing'));
        // this.nativeAudio.play(this.contador).then((msg)=>{this.secuenciaGrabada.push(this.contador);
        //         console.log("exito"+msg)}, 
        //         (err) => console.log("error"+err));
      }, 1000 );
      this.contador++;
      if (this.contador < 16) {
        this.mostrarToast("Sonido almacenado Nº" + this.contador,"succesAlert");
      }
      if (this.contador == 16) {
        this.mostrarToast("Sonido almacenado Nº" + this.contador +" uno más","warningAlert");
      }
      if (this.contador == 17) {
        this.mostrarToast("Sonido almacenado Nº" + this.contador+" final","izquierdaAlert");
        this.apagarbotones = true;

      }
      console.log("contado despues: ",this.contador);

  }


  reproducir()
  {

    
    this.mostrarPlay = false;
    this.mostrarSpiner = true;
    this.apagarbotones = true;
    this.mostrarStop = true;
    this.reproductor = false;
   console.log("this.secuenciaGrabada: ",this.secuenciaGrabada);
   console.log("this.secuenciaGrabada leg: ",this.secuenciaGrabada.length);
   console.log("contado: ",this.contador);
   console.log("this.indice: ",this.indice);
   if (this.indice == this.secuenciaGrabada.length) {
    console.log("this.secuenciaGrabada leg: ",this.secuenciaGrabada.length);
    console.log("this.indice: ",this.indice);
     console.log("final");
     this.secuenciaGrabada =[]
     this.vaciarTodo();
     this.contador ="0";
     this.mostrarPlay = false;
     this.mostrarStop = false
     this.mostrarToast("Secuencia finalizada","primeraAlert");
     this.mostrarSpiner = false;
     this.apagarbotones = false;
     this.reproductor = true;
     return;
     }
   
   this.nativeAudio.play(this.secuenciaGrabada[this.indice], ()=> this.reproducir()).then((msg)=>console.log(msg), (err) => console.log(err));

   
   this.indice += 1;
   

  }
  public vaciarTodo(){
    this.nativeAudio.unload("20");
    this.nativeAudio.unload("19");
    this.nativeAudio.unload("18");
    this.nativeAudio.unload("17");
    this.nativeAudio.unload("16");
    this.nativeAudio.unload("15");
    this.nativeAudio.unload("14");
    this.nativeAudio.unload("13");
    this.nativeAudio.unload("12");
    this.nativeAudio.unload("11");
    this.nativeAudio.unload("10");
    this.nativeAudio.unload("9");
    this.nativeAudio.unload("8");
    this.nativeAudio.unload("7");
    this.nativeAudio.unload("6");
    this.nativeAudio.unload("5");
    this.nativeAudio.unload("4");
    this.nativeAudio.unload("3");
    this.nativeAudio.unload("2");
    this.nativeAudio.unload("1");
  }

  public stopTodo(){
    this.nativeAudio.unload("20");
    this.nativeAudio.unload("19");
    this.nativeAudio.unload("18");
    this.nativeAudio.unload("17");
    this.nativeAudio.unload("16");
    this.nativeAudio.unload("15");
    this.nativeAudio.unload("14");
    this.nativeAudio.unload("13");
    this.nativeAudio.unload("12");
    this.nativeAudio.unload("11");
    this.nativeAudio.unload("10");
    this.nativeAudio.unload("9");
    this.nativeAudio.unload("8");
    this.nativeAudio.unload("7");
    this.nativeAudio.unload("6");
    this.nativeAudio.unload("5");
    this.nativeAudio.unload("4");
    this.nativeAudio.unload("3");
    this.nativeAudio.unload("2");
    this.nativeAudio.unload("1");
    console.log("final");
    this.secuenciaGrabada =[]
    this.vaciarTodo();
    this.contador ="0";
    this.mostrarPlay = false;
    this.mostrarStop = false
    this.mostrarToast("Secuencia Interrumpida","warningAlert");
    this.mostrarSpiner = false;
    this.apagarbotones = false;
    this.reproductor =true;

  }
  // apagarBotones()
  // {
  //  let btn1:any = document.getElementById("btn1");
  //  let btn2:any = document.getElementById("btn2");
  //  let btn3:any = document.getElementById("btn3");
  //  let btn4:any = document.getElementById("btn4");
  //  let btn5:any = document.getElementById("btn5");
  //  let btn6:any = document.getElementById("btn6");
  //  let btn7:any = document.getElementById("btn7");
  //  let btn8:any = document.getElementById("btn8");
  //  let btn9:any = document.getElementById("btn9");
  //  let btn10:any = document.getElementById("btn10");
  //  let btn11:any = document.getElementById("btn11");
  //  let btn12:any = document.getElementById("btn12");
  //  let btn13:any = document.getElementById("btn13");
  //  let btn14:any = document.getElementById("btn14");
  //  let btn15:any = document.getElementById("btn15");
  //  let btn16:any = document.getElementById("btn16");
  //  let btn17:any = document.getElementById("btn17");
  //  let btn18:any = document.getElementById("btn18");
  //  let btn19:any = document.getElementById("btn19");
  //  let btn20:any = document.getElementById("btn20");


  //  btn1.disabled =true;
  //  btn2.disabled =true;
  //  btn3.disabled =true;
  //  btn4.disabled =true;
  //  btn5.disabled =true;
  //  btn6.disabled =true;
  //  btn7.disabled =true;
  //  btn8.disabled =true;
  //  btn9.disabled =true;
  //  btn10.disabled =true;
  //  btn11.disabled =true;
  //  btn12.disabled =true;
  //  btn13.disabled =true;
  //  btn14.disabled =true;
  //  btn15.disabled =true;
  //  btn16.disabled =true;
  //  btn17.disabled =true;
  //  btn18.disabled =true;
  //  btn19.disabled =true;
  //  btn20.disabled =true;
  // }

  // prenderBotones()
  // {
  //   let btn1:any = document.getElementById("btn1");
  //   let btn2:any = document.getElementById("btn2");
  //   let btn3:any = document.getElementById("btn3");
  //   let btn4:any = document.getElementById("btn4");
  //   let btn5:any = document.getElementById("btn5");
  //   let btn6:any = document.getElementById("btn6");
  //   let btn7:any = document.getElementById("btn7");
  //   let btn8:any = document.getElementById("btn8");
  //   let btn9:any = document.getElementById("btn9");
  //   let btn10:any = document.getElementById("btn10");
  //   let btn11:any = document.getElementById("btn11");
  //   let btn12:any = document.getElementById("btn12");
  //   let btn13:any = document.getElementById("btn13");
  //   let btn14:any = document.getElementById("btn14");
  //   let btn15:any = document.getElementById("btn15");
  //   let btn16:any = document.getElementById("btn16");
  //   let btn17:any = document.getElementById("btn17");
  //   let btn18:any = document.getElementById("btn18");
  //   let btn19:any = document.getElementById("btn19");
  //   let btn20:any = document.getElementById("btn20");

  //   btn1.disabled =false;
  //   btn2.disabled =false;
  //   btn3.disabled =false;
  //   btn4.disabled =false;
  //   btn5.disabled =false;
  //   btn6.disabled =false;
  //   btn7.disabled =false;
  //   btn8.disabled =false;
  //   btn9.disabled =false;
  //   btn10.disabled =false;
  //   btn11.disabled =false;
  //   btn12.disabled =false;
  //   btn13.disabled =false;
  //   btn14.disabled =false;
  //   btn15.disabled =false;
  //   btn16.disabled =false;
  //   btn17.disabled =false;
  //   btn18.disabled =false;
  //   btn19.disabled =false;
  //   btn20.disabled =false;
  // }



  

}

