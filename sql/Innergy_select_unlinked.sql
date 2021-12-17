SELECT ProjNumber AS 'Unlinked' FROM Projects p
WHERE NOT EXISTS (SELECT *
                    FROM   Opportunities o
                    WHERE  p.ProjNumber = o.ProjNumber);