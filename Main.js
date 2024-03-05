class MiraxAIProduct {
    launchurl =""
  constructor(url,appId,appKey,component,TypeID,ProductID,lat,lang ) {
    this.url = url;
    this.appId = appId;
    this.appKey = appKey;
    this.component = component;
    this.TypeID = TypeID;
    this.ProductID = ProductID;
    this.lat = lat;
    this.lang = lang;
  }


  receiveData(callback = null) {
    const iframe = document.createElement("iframe");
    iframe.style.position = 'fixed';
    iframe.style.inset = 0;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';
    iframe.setAttribute('allow', 'microphone; camera');
    
    // Append iframe to the document body
    document.body.appendChild(iframe);
    
    // Load content into the iframe
    iframe.onload = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  
        const newElement = iframeDocument.createElement("div");
        newElement.textContent = "Data received: " + JSON.stringify(this);
        iframeDocument.body.appendChild(newElement);
  
        if (callback && typeof callback === 'function') {
          callback(null, " MiraxAI Data received successfully");
        }
      } catch (error) {
        console.error(" MiraxAI Error occurred while accessing the iframe content:", error.message);
        if (callback && typeof callback === 'function') {
          callback(error, null);
        }
      }
    };
  
    iframe.onerror = (error) => {
      console.error("MiraxAI Error occurred while loading the iframe:", error.message);
      if (callback && typeof callback === 'function') {
        callback(error, null);
      }
    };
    
    this.launchurl=`${this.url}/product/${this.component}?TypeId=${this.TypeID}&ProductId=${this.ProductID}&AppKey=${this.appKey}&AppId=${this.appId}&lat=${this.lat}&lang=${this.lang}`
    iframe.src = this.launchurl;
  }
}

function sendDataToMiraxAIProduct(url,appId,appKey,component,TypeID,ProductID,lat,lang, callback) {
  const miraxAIProduct = new MiraxAIProduct(url,appId,appKey,component,TypeID,ProductID,lat,lang);
  miraxAIProduct.receiveData(callback);
}
