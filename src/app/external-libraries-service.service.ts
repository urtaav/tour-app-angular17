import { Injectable } from '@angular/core';

@Injectable()
export class ExternalLibrariesServiceService {
  static injectLib(
    src: string,
    integrity?: string,
    crossOrigin?: string
  ): void {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = src;
    if (integrity) {
      script.integrity = integrity;
    }
    if (crossOrigin) {
      script.crossOrigin = crossOrigin;
    }
    script.type="text/javascript"
    document.body.appendChild(script);
  }
}
