CREATE TABLE bilett(
    id INTEGER AUTO_INCREMENT NOT NULL,
    tittel VARCHAR(255) NOT NULL,
    antall INTEGER NOT NULL,
    fornavn VARCHAR(255) NOT NULL,
    etternavn VARCHAR(255) NOT NULL,
    telefonnr int NOT NULL,
    epost VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);