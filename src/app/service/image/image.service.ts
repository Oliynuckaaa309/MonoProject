import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor( private storage: Storage) { }
  async uploadFile(folder:string, name:string, fileData:File | null):Promise<string>{
    const path=`${folder}/${name}`;
    let url='';
    if(fileData){
      try{
    const storageRef=ref(this.storage, path);
    const task=uploadBytesResumable(storageRef, fileData);
    percentage(task).subscribe(data=>{
    
    
    })
    await task;
    url= await getDownloadURL(storageRef);
    
      }
      catch(e:any){
    console.error(e)
      }
    }
    else{
      console.log('Wrong format')
    }
    return Promise.resolve(url)
    }
}
