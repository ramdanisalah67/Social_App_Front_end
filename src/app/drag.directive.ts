import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { ImageHandle } from './Models/ImageHandle';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {

  @Output() files:EventEmitter<ImageHandle> = new EventEmitter() ;


  @HostBinding("style.background") private background = "#eee"
    constructor(private mysanitize:DomSanitizer) { }
    
  @HostListener("dragover",["$event"])
    public onDragover( evt:DragEvent){
      evt.preventDefault();
      evt.stopPropagation();
      this.background="#999"
    }
  
    @HostListener("dragleave",["$event"])
    public onDragLeave(evt:DragEvent){
      evt.preventDefault()
      evt.stopPropagation()
      this.background = "#eee"
    }
  
    @HostListener("drop",["$event"])
    public onDrop(evt:DragEvent){
      evt.preventDefault()
      evt.stopPropagation()
      this.background = "#eee"
  
      let fileHandle:ImageHandle 
    const file = evt.dataTransfer!.files[0];
    const url = this.mysanitize.bypassSecurityTrustUrl(window.URL.createObjectURL(file!));
    fileHandle={file,url}  
    this.files.emit(fileHandle)
  }

}
