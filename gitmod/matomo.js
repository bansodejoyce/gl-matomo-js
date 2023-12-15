addGainsight();
var checkRequiredElementsExist = setInterval(function () {
  console.log("window.gl  ",window.gl);
  console.log("document.querySelectorAll('[data-user]').length  ",document.querySelectorAll('[data-user]').length);
  if (window.gl !== 'undefined') {
    clearInterval(checkRequiredElementsExist);
    hideThings();
    // gainsightIdentify();
  }
}, 200);

console.log("checkRequiredElementsExist  ",checkRequiredElementsExist);

function hideThings () {
  
  var webIdeButton = document.querySelector('[data-qa-selector="action_dropdown"]')
  webIdeButton.setAttribute('style', 'display:none !important');

  // if (webIdeButton.style.display === "block" ) {
  //   webIdeButton.style.display = 'none !important';
  // }
  var editButton = document.getElementById('dropdown-toggle-btn-52')
  if (editButton.style.display === "block") {
    editButton.style.display = 'none !important';
  }
  if ((editIdeButton = document.querySelector('[data-track-action="click_edit_ide"]'))) {
    editIdeButton.style.display = 'none !important';
  }
  if ((infrastructureLink = document.querySelector('[data-track-label="infrastructure_menu"]'))) {
    infrastructureLink.style.display = 'none !important';
  }
  if ((monitorLink = document.querySelector('[data-track-label="monitor_menu"]'))) {
    monitorLink.style.display = 'none !important';
  }
  if ((k8sLink = document.evaluate(
        "//a[contains(text(),'Add Kubernetes cluster')]", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue)
  ) {
    k8sLink.style.display = 'none';
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
   aptrinsic("identify", { "id": document.querySelectorAll('[data-user]')[0].getAttribute('data-user') } );
}