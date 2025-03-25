export const load = async() => {
  let data = `\n\n\nDB.SQL
  CREATE TABLE contractorTypes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL
);

SELECT * FROM contractorTypes;

CREATE TABLE contractors (
	id SERIAL PRIMARY KEY,
	typeId INTEGER REFERENCES contractorTypes(id),
	name VARCHAR(255) NOT NULL,
	address TEXT,
	inn CHAR(10) UNIQUE,
	contactLastName VARCHAR(255),
	contactFirstName VARCHAR(255),
	contactPatronymic VARCHAR(255),
	phoneNumber CHAR(12),
	email VARCHAR(255),
	rating INTEGER CHECK (rating >= 0)
);

SELECT * FROM contractors;

CREATE TABLE services (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	cost INTEGER CHECK (cost >= 0),
	preparationTime VARCHAR(64)
);

SELECT * FROM services;

CREATE TABLE serviceContractors (
	id SERIAL PRIMARY KEY,
	serviceId INTEGER REFERENCES services(id),
	contractorId INTEGER REFERENCES contractors(id),
	UNIQUE (contractorId, serviceId)
);

SELECT * FROM serviceContractors;

CREATE TABLE serviceHistory (
	id SERIAL PRIMARY KEY,
	serviceId INTEGER REFERENCES services(id),
	contractorId INTEGER REFERENCES contractors(id),
	qualityRating REAL NOT NULL,
	timelinessPercentage INTEGER CHECK (timelinessPercentage >= 0 AND timelinessPercentage <= 100),
	completionDate DATE
);

SELECT * FROM serviceHistory;

CREATE OR REPLACE VIEW contractorReliability
AS
SELECT
    c.id AS "ID",
    ct.name AS "Тип",
    c.name AS "Название",
    c.address AS "Юридический адрес",
    c.inn AS "ИНН",
    concat(c.contactLastName, ' ', c.contactFirstName, ' ', c.contactPatronymic) AS "Контактное лицо",
    c.phoneNumber AS "Номер телефона",
    c.email AS "Электронная почта",
    c.rating AS "Рейтинг",
    round((sr.avgQuality * 0.6::double precision + (sr.avgTimeliness * 0.4)::double precision)::numeric, 1) AS "Надежность",
    CASE
        WHEN round((sr.avgQuality * 0.6::double precision + (sr.avgTimeliness * 0.4)::double precision)::numeric, 1) >= 4.5 AND round((sr.avgQuality * 0.6::double precision + (sr.avgTimeliness * 0.4)::double precision)::numeric, 1) <= 5.0 THEN 'Высокая надежность'::text
        WHEN round((sr.avgQuality * 0.6::double precision + (sr.avgTimeliness * 0.4)::double precision)::numeric, 1) >= 3.5 AND round((sr.avgQuality * 0.6::double precision + (sr.avgTimeliness * 0.4)::double precision)::numeric, 1) < 4.5 THEN 'Средняя надежность'::text
        ELSE 'Низкая надежность'::text
    END AS "Категория надежности"
FROM
    contractors c
LEFT JOIN
    contractorTypes ct ON c.typeId = ct.id
LEFT JOIN
    (SELECT
        serviceHistory.contractorId,
        avg(serviceHistory.qualityRating) AS avgQuality,
        avg(serviceHistory.timelinessPercentage::numeric / 100.0) AS avgTimeliness
    FROM
        serviceHistory
    GROUP BY
        serviceHistory.contractorId) AS sr ON c.id = sr.contractorId;

INSERT INTO contractorTypes VALUES
(DEFAULT, 'Оборудование'),
(DEFAULT, 'Персонал'),
(DEFAULT, 'Услуги');

INSERT INTO serviceContractors VALUES
(DEFAULT, 1, 1),
(DEFAULT, 2, 2),
(DEFAULT, 3, 1),
(DEFAULT, 4, 3);


\n\n\n\n\n\n\n\n\n`

return {data};
}