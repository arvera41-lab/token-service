-- ./db/init/init.sql

-- 1. Crear el esquema si no existe
CREATE SCHEMA IF NOT EXISTS uesqtech;

-- 2. Crear la tabla dentro del esquema uesqtech
CREATE TABLE IF NOT EXISTS uesqtech.tokens (
     fiidtokens     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY
    ,fctoken        VARCHAR(48)  NOT NULL UNIQUE
    ,fcusuario      VARCHAR(100) NOT NULL
    ,fccontrasenia  VARCHAR(255) NOT NULL
    ,fistatus       SMALLINT     DEFAULT 1
    ,fdcreateddate  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
    ,fdmodifieddate TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

GRANT USAGE,CREATE ON SCHEMA uesqtech to localdb;
GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA uesqtech TO localdb;
ALTER DEFAULT PRIVILEGES IN SCHEMA uesqtech GRAN SELECT,INSERT,DELETE,UPDATE ON TABLES TO localdb;
