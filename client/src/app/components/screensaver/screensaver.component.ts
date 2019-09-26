import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
import { MatDialog } from "@angular/material";
import * as THREE from "three";
import * as POSTPROCESSING from "postprocessing";
import { HttpService } from "../../services/http-service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-screensaver",
  templateUrl: "./screensaver.component.html",
  styleUrls: ["./screensaver.component.css"]
})
export class ScreensaverComponent implements OnInit {
  constructor(public httpService: HttpService, private router: Router) {}

  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }
  @ViewChild("rendererContainer",  { static: true }) rendererContainer: ElementRef;
  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  composer = null;
  cloudParticles = [];
  intensity = 1;
  x = 0.0025;
  y = 0.55;

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.scene.fog = new THREE.FogExp2(0x5a4b3c, 0.001);
    // this.renderer.setClearColor(this.scene.fog.color);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.render();
  }

  render() {
    this.cloudParticles.forEach(p => {
      p.rotation.z -= this.x;
    });
    window.requestAnimationFrame(() => this.render());
    this.composer.render(0.1);
  }

  ngOnInit() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27;

    let ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(ambient);
    let smoke = new THREE.TextureLoader().load("../../../assets/smoke.png");
    let space = new THREE.TextureLoader().load("../../../assets/space-1.jpg");
    const textureEffect = new POSTPROCESSING.TextureEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      texture: space
    });
    textureEffect.blendMode.opacity.value = 0.1;
    let cloudGeo = new THREE.PlaneBufferGeometry(500, 800);
    let cloudMaterial = new THREE.MeshLambertMaterial({
      map: smoke,
      transparent: true
    });

    for (let p = 0; p < 50; p++) {
      let cloud: any = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 500
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = this.y;
      this.cloudParticles.push(cloud);
      this.scene.add(cloud);
    }
    let directionalLight = new THREE.DirectionalLight(0xff8c19);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);
    let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
    orangeLight.position.set(200, 300, 100);
    this.scene.add(orangeLight);
    let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
    redLight.position.set(100, 300, 100);

    this.scene.add(redLight);
    let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
    blueLight.position.set(300, 300, 200);
    this.scene.add(blueLight);

    const bloomEffect = new POSTPROCESSING.BloomEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      kernelSize: POSTPROCESSING.KernelSize.SMALL,
      useLuminanceFilter: true,
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.75
    });
    bloomEffect.blendMode.opacity.value = 1.5;

    let effectPass = new POSTPROCESSING.EffectPass(
      this.camera,
      bloomEffect,
      textureEffect
    );
    effectPass.renderToScreen = true;
    this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
    this.composer.addPass(
      new POSTPROCESSING.RenderPass(this.scene, this.camera)
    );
    this.composer.addPass(effectPass);
  

   
  }
  onSubmit() {
    for (let i = 0.0025; i < 0.09; i = i + 0.00001) {
      this.x = i;
    }
  }
}
