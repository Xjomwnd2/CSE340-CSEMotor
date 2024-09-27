INSERT INTO account (first_name, last_name, email, password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE account
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';

DELETE FROM account
WHERE email = 'tony@starkent.com';

UPDATE vehicle
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE vehicle_name = 'GM Hummer';
