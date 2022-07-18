DROP SCHEMA IF EXISTS Corretora;
CREATE SCHEMA IF NOT EXISTS Corretora;

CREATE TABLE Corretora.Clientes (
  CodCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  NomeCliente TEXT NOT NULL,
  Saldo DECIMAL NOT NULL
);

CREATE TABLE Corretora.Ativos (
  CodAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  NomeAtivo TEXT NOT NULL,
  QtdeAtivo INTEGER,
  Valor DECIMAL NOT NULL
);

CREATE TABLE Corretora.Ativos_Cliente (
  CodOperacao INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  CodCliente INTEGER,
  FOREIGN KEY (CodCliente) REFERENCES Corretora.Clientes (CodCliente),
  CodAtivo INTEGER,
  FOREIGN KEY (CodAtivo) REFERENCES Corretora.Ativos (CodAtivo),
  QtdeAtivo INTEGER
);

INSERT INTO
  Corretora.Clientes (NomeCliente, Saldo)
VALUES
  ("Isabela", 100);

INSERT INTO 
  Corretora.Ativos (NomeAtivo, QtdeAtivo, Valor)
VALUES
  ('XP', 10, 17.53);

INSERT INTO
  Corretora.Ativos_Cliente(CodCliente, CodAtivo, QtdeAtivo)
VALUES
  (1,1,1);