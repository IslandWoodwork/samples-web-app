SELECT ID, JobNumber, JobName, DueDate, ShopStatus, TransmittalNotes, IntercompanyNotes, PMStatus, Cut, Figure, Veneers, Finish, Sheen, Color, Match, Fsc, FlitchNo, AWISystemNo, Hardwood, FireResistance, ChemicalResistance, Filler, Nauf, RequestedBy, RequestDate, QuantityRequested, SampleType, IncludeOnShopList, Client, ControlSampleStatus, FranksDate, DesignationArchitect, PurposeOfSample, RequestedName, MatInStock, Architect, ControlSample, Vendor, Remarks
FROM Samples
WHERE
(ShopStatus<>'Completed' OR ShopStatus IS NULL)
	AND IncludeOnShopList='True'
	AND PMStatus IS NULL
ORDER BY ID DESC;