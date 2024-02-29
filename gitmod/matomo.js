addGainsight();

var checkRequiredElementsExist = setInterval(function () {
    // checkURLchange(oldURL);
    if (window.gl !== 'undefined' && document.readyState == "complete" && document.querySelectorAll('[data-project]').length) {
      clearInterval(checkRequiredElementsExist);
      addObserverIfDesiredNodeAvailable(document.querySelectorAll('[data-project]'));
      hideThings();
      gainsightIdentify();
    }
  }, 200);


function addObserverIfDesiredNodeAvailable(composeBox) {
  console.log("in event listener ",composeBox);
  // var composeBox = document.querySelectorAll("[data-project]");
    if(!composeBox) {
        window.setTimeout(addObserverIfDesiredNodeAvailable,200);
        return;
    }
      hideThings();
      var config = {childList: true};

    const composeObserver = new MutationObserver(addObserverIfDesiredNodeAvailable);
    composeObserver.observe(composeBox,config);
}

/**
 * Add logic to hide the webide and edit options from Code Studio UI
 *
 */ 
function hideThings () {
  console.log("in hideThings")
  // Fetch the document that contains 'Web IDE' text
  var webIde = document.evaluate("//span[contains(., 'Web IDE')]", document, null, XPathResult.ANY_TYPE, null );
  var webIdeDoc = webIde.iterateNext();
  var content;
  console.log(" webIdeDoc ", webIdeDoc)
  if(webIde != null && webIdeDoc != null){
    content = webIdeDoc.textContent || webIdeDoc.innerText;
    console.log(" content ", content)
  
    // The style is applied on multiple lists available to edit the files
    if (content.toLowerCase().includes("open in web ide")){
      console.log(" webIdeDoc.closest(li) ", webIdeDoc.closest("li"))
      webIdeDoc.closest("li").setAttribute('style', 'display:none !important');
    } else {
      // The style is applied on when there is one option available to edit through web ide
      console.log(" webIdeDoc.parentNode.closest(.gl-new-dropdown) ", webIdeDoc.parentNode.closest(".gl-new-dropdown"))
      webIdeDoc.parentNode.closest(".gl-new-dropdown").setAttribute('style', 'display:none !important');
    }
  }

  // Hide Operator section from left panel
  if ((operateLink = document.querySelector('[data-qa-section-name="Operate"]'))) {
    operateLink.setAttribute('style', 'display:none !important')
  }
  // Hide Monitor section from left panel
  if ((monitorLink = document.querySelector('[data-qa-section-name="Monitor"]'))) {
    monitorLink.setAttribute('style', 'display:none !important')
  }
  // Hide 'Add Kubernetes cluster' section from project page
  if ((k8sLink = document.evaluate(
        "//a[contains(.,'Add Kubernetes cluster')]", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue)
  ) {
    k8sLink.setAttribute('style', 'display:none !important');
  }
}

function addGainsight () {
  var gainsight_api_keys = {
    // Prod.
    'code.acquia.com': 'AP-IJB0Z39VSYPZ-2',
    // Dev.
    'code.dev.cloudservices.acquia.io': 'AP-IJB0Z39VSYPZ-2-2',
    // Stage.
    'code-staging.cloudservices.acquia.io': 'AP-IJB0Z39VSYPZ-2-3'
  }
  if (location.hostname in gainsight_api_keys) {
    var gainsight_key = gainsight_api_keys[location.hostname];
  } else {
    // Default api key is the prod one.
    var gainsight_key = 'AP-IJB0Z39VSYPZ-2';
  }
  (function(n,t,a,e,co){var i="aptrinsic";n[i]=n[i]||function(){
        (n[i].q=n[i].q||[]).push(arguments)},n[i].p=e;n[i].c=co;
        var r=t.createElement("script");r.async=!0,r.src=a+"?a="+e;
        var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c)
    })(window,document,"https://web-sdk.aptrinsic.com/api/aptrinsic.js",gainsight_key);
}

function gainsightIdentify() {
   aptrinsic("identify", { "id": document.querySelectorAll('[data-project]')[0].getAttribute('data-project') } );
}

// Ensuring call of function 'hideThings' after entire page loads properly, to avoid race conditions
window.addEventListener("load", afterLoaded, false);

function afterLoaded() {
  // Additional wait for 500 milli seconds
  const additionalWait = setTimeout(hideThings, 200);
}





