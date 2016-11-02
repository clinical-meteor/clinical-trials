clinical-trials
=========

Data collection application intended for pharmaceuticals clinical trials.  Contains integrated forms builder, hipaa audit log, validation testing, and mobile computing components.  Has necessary components to become FDA and CCHIT certified.  This application represents approximately 200 hours worth of direct work, and two years of development efforts with the Meteor framework.


============================
#### Meteor Version

0.9.2.2


============================
#### Install Application

````sh
git clone https://github.com/awatson1978/clinical-trials.git
cd clinical-trials
meteor
````

============================
#### Run Acceptance Tests

````sh

# optional:  you may want to reset your application data
terminal-a$ meteor reset

# run your application as usual
terminal-a$ meteor

# then open up a second terminal and run_nightwatch to run all tests
terminal-b$ sudo chmod g+x run_nightwatch.sh
terminal-b$ sudo ./run_nightwatch.sh

# or specify a specific test
terminal-b$ sudo ./run_nightwatch.sh -t tests/homePage.js

````

============================
#### HIPAA Compliance  

To even think about bringing this into production, you'll need to add an SSL certificate to the app.
````
meteor add force-ssl
````

============================
#### FDA Certification

If you want to get FDA certified, you'll need to address the requirements in [Title 21, Part 11](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=11).  Clinical-Trials currently ships with 800+ acceptance tests.  You'll probably need to increase them to close to 2000 tests to get the product ready for market, and another 2000 tests to address the regulatory requirements.  All told, if you aim for 4000 to 5000 tests, you'll probably be in the right ballpark.  


============================
#### Clinical Trial Protocol Templates  

[Phase III Trials Protocol Template (NIH - Neurological Disorders and Stroke)](http://www.ninds.nih.gov/research/clinical_research/toolkit/protocol.htm)  
[Clinical Trials Protocol Templates (NIH - Allergy and Infection Diseases)](http://www.niaid.nih.gov/labsandresources/resources/toolkit/protocol/Pages/protocol.aspx)  
[Interventional Clinical Protocol Template (NIH - Dental and Craniofacial Research)](http://www.nidcr.nih.gov/Research/ToolsforResearchers/Toolkit/InterventionProtocolTemplate.htm)  


============================
#### Clinical Trial Protocol Examples  

[Rimonabant 20mg for reducing cardiovascular events (Phase III)](http://www.stsiweb.org/images/uploads/CRESCENDOfinal.pdf_.pdf)  
[Modafinil for Cocain Dependence (Phae II)](http://www.med.upenn.edu/ocr/protocol/sample/sample.html)  
[Inclusion and Exclusion Criteria](http://www.unm.edu/~rrobergs/604Lect2.pdf)  



============================
#### Other Resources

https://clinicaltrials.gov/  
https://api.molecularmatch.com  


------------------------
### Licensing

MIT.  Use as you will.  Disrupt the current system.  It needs all the help it can get.
