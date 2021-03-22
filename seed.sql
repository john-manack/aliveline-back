INSERT INTO activities (title, details, is_complete, is_billable, is_favorite, user_sub)
VALUES
('Leslie Knope Return', 'Form 1040 Preparation', FALSE, TRUE, FALSE, 'google-oauth2|106823713440282669958'),
('Ron Swanson Return', 'Form 1065 Preparation', FALSE, TRUE, FALSE, 'google-oauth2|106823713440282669958'),
('April Ludgate Return', 'Form 706 Preparation', FALSE, TRUE, FALSE, 'google-oauth2|106823713440282669958'),
('Tom Haverford Project', 'Rent vs Buy Analysis', FALSE, TRUE, FALSE, 'google-oauth2|106823713440282669958'),
('Andy Dwyer Return', 'Form 1120-S Preparation', FALSE, TRUE, FALSE, 'google-oauth2|106823713440282669958'),
('Michael Scott Return', 'Form 1120-S Preparation', FALSE, TRUE, FALSE, 'auth0|6058ec908a24d70070efda17');

INSERT INTO nested_notes (note_entry, activity_reference)
VALUES
('See capital gains schedule from last year', 1),
('See dividends schedule from last year', 2),
('See interest schedule from last year', 3);

INSERT INTO nested_hours (hours_entry, hours_description, activity_reference)
VALUES
(1, 'File rollforward', 1),
(2, 'File rollforward', 2),
(3, 'File rollforward', 3),
(4, 'File rollforward', 4);