# samples-web-app
Our company's web application to replace Microsoft Access.

We migrated our Microsoft Access application, for samples that we fabricate and send out to our clents, to Microsoft SQL Server. This web application acts as a replacement for the forms and utilities of the Microsoft Access application. All of our samples data, that we migrated to SQL Server, is mutable in the web application. The data visualization UX is developed using jquery (a frontend framework). This web app pulls data from an API and populates tables in the database using PHP. Any pushing/pulling of data is handled using AJAX. I am hosting the web application using XAMPP (Apache) locally on our network.

The UX is handled using a javascript library: [DevExpress](https://js.devexpress.com/Documentation/)

Our goal was to "mimic" some tools of our ERP system: [Innergy](https://www.innergy.com/)
