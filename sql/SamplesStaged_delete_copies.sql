DELETE FROM SamplesStaged
WHERE EXISTS (SELECT *
                FROM Samples
                WHERE Samples.ID = SamplesStaged.ID);