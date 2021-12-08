IF OBJECT_ID('FSAIRTAG_TR_INC_ALT_DEL','TR') IS NULL
EXEC('	
CREATE TRIGGER FSAIRTAG_TR_INC_ALT_DEL
	   ON FSAIRTAG
	   AFTER INSERT,UPDATE,DELETE
	AS

	DECLARE @LOGCTABELA VARCHAR(50)
	DECLARE @LOGCID_REC VARCHAR(50)
	DECLARE @LOGMXMLREC XML
	DECLARE @LOGCTIPALT CHAR(01)
	DECLARE @AIRNID_AIR INT

	SET @LOGCTABELA = ''FSAIRTAG''
	SET @LOGCTIPALT = ''I''

	DECLARE @COUNT AS INT
	SELECT  @COUNT = COUNT(*) FROM DELETED

	IF @COUNT > 0
		BEGIN
			SET @LOGCTIPALT = ''E''
			SELECT @COUNT = COUNT(*) FROM INSERTED
			IF @COUNT > 0
				SET @LOGCTIPALT = ''A''
		END

	

	IF @LOGCTIPALT = ''A'' AND (  UPDATE (AIRCUSUCAD) OR UPDATE (AIRDDATCAD) OR UPDATE (AIRCUSUALT) OR UPDATE (AIRDDATALT) )
		BEGIN
			RAISERROR (''N�O � PERMITIDO EDITAR CAMPOS CHAVES!'', 16, 10)
			ROLLBACK
			RETURN
		END
	ELSE 
		IF @LOGCTIPALT = ''I''
			BEGIN
				UPDATE FSAIRTAG
					SET AIRCUSUCAD = SYSTEM_USER, AIRDDATCAD = GETDATE()
					FROM FSAIRTAG AIR, INSERTED
					WHERE AIR.AIRNID_AIR = INSERTED.AIRNID_AIR

					DECLARE TMPCURSINS CURSOR FOR SELECT AIRNID_AIR FROM INSERTED
			OPEN TMPCURSINS
			FETCH NEXT FROM TMPCURSINS INTO @AIRNID_AIR
			WHILE (@@FETCH_STATUS = 0)
				BEGIN
					SET @LOGCID_REC= REPLACE(STR(@AIRNID_AIR,10,0),'' '',''0'')
					SET @LOGMXMLREC= (SELECT * FROM INSERTED WHERE AIRNID_AIR = @AIRNID_AIR FOR XML RAW)

					INSERT INTO FS_CAD..FSLOGLOG ( LOGCTABELA,  LOGCID_REC,  LOGCTIPALT,  LOGMXMLREC, LOGCUSUALT  , LOGDDATALT)  
						                  VALUES (@LOGCTABELA, @LOGCID_REC, @LOGCTIPALT, @LOGMXMLREC, SYSTEM_USER , GETDATE())
					FETCH NEXT FROM TMPCURSINS INTO @AIRNID_AIR
				END
			CLOSE TMPCURSINS
			DEALLOCATE TMPCURSINS
				
			END
		ELSE 
			IF @LOGCTIPALT = ''A'' OR @LOGCTIPALT = ''E'' OR @LOGCTIPALT = ''R''
				BEGIN
					

					UPDATE FSAIRTAG
						SET AIRCUSUALT = SYSTEM_USER, AIRDDATALT = GETDATE()
						FROM FSAIRTAG AIR, INSERTED
						WHERE AIR.AIRNID_AIR = INSERTED.AIRNID_AIR

						DECLARE TMPCURSINS CURSOR FOR SELECT AIRNID_AIR FROM DELETED
			OPEN TMPCURSINS
			FETCH NEXT FROM TMPCURSINS INTO @AIRNID_AIR
			WHILE (@@FETCH_STATUS = 0)
				BEGIN
					SET @LOGCID_REC= REPLACE(STR(@AIRNID_AIR,10,0),'' '',''0'')
					SET @LOGMXMLREC= (SELECT * FROM DELETED WHERE AIRNID_AIR = @AIRNID_AIR FOR XML RAW)

					INSERT INTO FS_CAD..FSLOGLOG ( LOGCTABELA,  LOGCID_REC,  LOGCTIPALT,  LOGMXMLREC, LOGCUSUALT  , LOGDDATALT)  
						                  VALUES (@LOGCTABELA, @LOGCID_REC, @LOGCTIPALT, @LOGMXMLREC, SYSTEM_USER , GETDATE())

					FETCH NEXT FROM TMPCURSINS INTO @AIRNID_AIR
				END
			CLOSE TMPCURSINS
			DEALLOCATE TMPCURSINS
				END
				')