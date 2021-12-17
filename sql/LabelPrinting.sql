SELECT ID, JobNumber, PMStatus, ShopStatus, JobName, DueDate, DeliveryMethod, PrintLabelCount
FROM Samples S
WHERE
((S.PMStatus)='Ordered')
	OR ( ( (S.ShopStatus)='Completed') AND
		( ((S.PMStatus)='') OR ((S.PMStatus) IS NULL) ) )
ORDER BY S.ID DESC;