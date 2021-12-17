CREATE VIEW Jobs
AS
SELECT Opportunities.OppNumber AS JobNumber, Opportunities.OppName AS JobName
FROM Opportunities
CROSS JOIN Projects WHERE Opportunities.ProjNumber = ''
UNION
SELECT ProjNumber AS JobNumber, ProjName AS JobName
FROM Projects;