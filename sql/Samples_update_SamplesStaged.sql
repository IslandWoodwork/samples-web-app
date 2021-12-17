UPDATE 
    Samples
SET 
    Samples.RequestDate = SamplesStaged.RequestDate,
    Samples.SampleType = SamplesStaged.SampleType,
    Samples.ApprovedDate = SamplesStaged.ApprovedDate,
    Samples.PMStatus = SamplesStaged.PMStatus,
    Samples.RequestedBy = SamplesStaged.RequestedBy,
    Samples.JobNumber = SamplesStaged.JobNumber,
    Samples.JobName = SamplesStaged.JobName,
    Samples.GeneralContractor = SamplesStaged.GeneralContractor,
    Samples.Architect = SamplesStaged.Architect,
    Samples.Client = SamplesStaged.Client,
    Samples.SentTo = SamplesStaged.SentTo,
    Samples.SentToName = SamplesStaged.SentToName,
    Samples.SentToAddr = SamplesStaged.SentToAddr,
    Samples.SentToPhone = SamplesStaged.SentToPhone,
    Samples.ControlSampleStatus = SamplesStaged.ControlSampleStatus,
    Samples.QuantityRequested = SamplesStaged.QuantityRequested,
    Samples.Cut = SamplesStaged.Cut,
    Samples.Figure = SamplesStaged.Figure,
    Samples.Veneers = SamplesStaged.Veneers,
    Samples.Finish = SamplesStaged.Finish,
    Samples.Sheen = SamplesStaged.Sheen,
    Samples.Color = SamplesStaged.Color,
    Samples.DesignationIAW = SamplesStaged.DesignationIAW,
    Samples.DesignationArchitect = SamplesStaged.DesignationArchitect,
    Samples.Match = SamplesStaged.Match,
    Samples.Fsc = SamplesStaged.Fsc,
    Samples.FlitchNo = SamplesStaged.FlitchNo,
    Samples.QuantitySF = SamplesStaged.QuantitySF,
    Samples.DueDate = SamplesStaged.DueDate,
    Samples.TransmittalNotes = SamplesStaged.TransmittalNotes,
    Samples.IntercompanyNotes = SamplesStaged.IntercompanyNotes,
    Samples.AWISystemNo = SamplesStaged.AWISystemNo,
    Samples.Hardwood = SamplesStaged.Hardwood,
    Samples.FireResistance = SamplesStaged.FireResistance,
    Samples.ChemicalResistance = SamplesStaged.ChemicalResistance,
    Samples.Filler = SamplesStaged.Filler,
    Samples.Nauf = SamplesStaged.Nauf,
    Samples.RejectionReason = SamplesStaged.RejectionReason,
    Samples.DeliveryMethod = SamplesStaged.DeliveryMethod,
    Samples.IncludeOnShopList = SamplesStaged.IncludeOnShopList,
    Samples.ShopStatus = SamplesStaged.ShopStatus
FROM 
    Samples
    INNER JOIN SamplesStaged
     ON Samples.ID = SamplesStaged.ID;