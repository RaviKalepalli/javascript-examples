const helper = require('./helper.js');
  
exports.config = {
   //Run locally
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //framework: 'jasmine',
  //specs: ['spec1.js'],
  
  //run on sauce
  seleniumAddress: "https://#{sauceUser}:#{sauceKey}@ondemand.saucelabs.com:443/wd/hub",

  multiCapabilities: [
   {
     platform: 'Windows 10',
     browserName: 'chrome',
     version: '71.0',
     screenResolution: '2560x1600'
   }, {
     platform: 'Windows 10',
     browserName: 'firefox',
     version: '64.0',
     screenResolution: '2560x1600'
   }],
  
  framework: 'jasmine',
   
  specs: ['spec1.js', 'spec2.js'],
    
  jasmineNodeOpts: {
     showColors: true,
     defaultTimeoutInterval: 30000
   },
      
  onPrepare: function () {
     global.batchId = helper.genBatchId();
  },
};
